---
title: Asymmetric Encryption and TLS in Rust
date: 2024-10-19
author: HK
tags: [Rust, Cryptography]
---

In this article, I will briefly discuss application of Asymmetric Encryption (ed25519) and TLS in Rust.

- SSL/TLS uses asymmetric encryption during the handshake phase to exchange keys securely and ensure authenticity.
- Asymmetric encryption ensures that communication is secure by using public-private key pairs. Algorithms like RSA, ECDSA, or ed25519 are used to verify identities and sometimes exchange keys.
- ed25519 is a specific algorithm used primarily for signing in asymmetric cryptography, providing a fast and secure way to verify that data (or certificates) are from a trusted source.

## Data Signing

### Signing Data with ed25519

ed25519 is often used for SSH authentication. You store the public key on the server, and the private key on the client.
Then you can ssh to server with the client private key, without the need to enter password.

SSH (Secure Shell) uses ed25519 keys for authentication in the following way:

1. Key Generation: The user generates an ed25519 key pair. The private key is kept securely on the client machine, while the public key is placed on the server.

2. Connection Initiation: When a client attempts to connect to an SSH server, the server sends a challenge to the client.

3. Signing the Challenge: The client uses its private key to sign the challenge, creating a signature.

4. Signature Verification: The client sends this signature back to the server. The server then uses the stored public key to verify the signature.

5. Authentication: If the signature is valid, it proves that the client possesses the corresponding private key, and the server grants access.

This process ensures secure authentication without transmitting the private key, leveraging the strength and efficiency of the ed25519 algorithm.

Let's use the popular ed25519 algorithm, which is usually used for ssh keys.

```rust
use ring::rand::SystemRandom;
use ring::signature::{Ed25519KeyPair, KeyPair, Signature, UnparsedPublicKey, ED25519};

fn main() {
    // Generate key pair
    let rng = SystemRandom::new();
    let private_key = Ed25519KeyPair::generate_pkcs8(&rng).unwrap();
    let key_pair = Ed25519KeyPair::from_pkcs8(private_key.as_ref()).unwrap();

    // Data to sign
    let message = b"Hello, sign this data!";

    // Sign the message
    let signature: Signature = key_pair.sign(message);

    // Verify the signature using the public key
    let public_key = key_pair.public_key();
    let peer_public_key_bytes = public_key.as_ref();

    let public_key_for_verification = UnparsedPublicKey::new(&ED25519, peer_public_key_bytes);
    match public_key_for_verification.verify(message, signature.as_ref()) {
        Ok(_) => println!("Signature verified successfully!"),
        Err(_) => println!("Signature verification failed!"),
    }
}
```

### RSA Encryption

Asymmetric encryption is used for public key encryption, where the public key is used to encrypt data, and the private key is used to decrypt data.

ed25519 is not used for public key encryption, but RSA is.

```rust
use rsa::{Pkcs1v15Encrypt, RsaPrivateKey, RsaPublicKey};

fn main() {
    let mut rng = rand::thread_rng();
    let bits = 2048;
    let priv_key = RsaPrivateKey::new(&mut rng, bits).expect("failed to generate a key");
    let pub_key = RsaPublicKey::from(&priv_key);

    // Encrypt
    let data = b"hello world";
    let enc_data = pub_key
        .encrypt(&mut rng, Pkcs1v15Encrypt, &data[..])
        .expect("failed to encrypt");
    assert_ne!(&data[..], &enc_data[..]);

    // Decrypt
    let dec_data = priv_key
        .decrypt(Pkcs1v15Encrypt, &enc_data)
        .expect("failed to decrypt");
    assert_eq!(&data[..], &dec_data[..]);
}
```

## SSL Certificate for HTTPS Server

TLS/SSL is more complicated, it involves asymmetric encryption, symmetric encryption, hash functions, and more.

Here we only show how to use a self-signed certificate for local use.

Let's generate a self-signed certificate and serve with an Axum rust server. Self-signed certificate is usually used in local network, between devices, but require some level of security.

### Generate SSL Certificate

```rust
// rcgen = "0.13.1"
use rcgen::generate_simple_self_signed;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let subject_alt_names = vec!["localhost".to_string()];
    let cert_key = generate_simple_self_signed(subject_alt_names).unwrap();
    let cert = cert_key.cert;
    let key = cert_key.key_pair;
    println!("Certificate generated successfully");
    let pem = cert.pem();
    let key = key.serialize_pem();

    println!("{}", pem);
    println!("{}", key);
    let pem_path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("cert.pem");
    let key_path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("key.pem");

    let mut pem_file = File::create(pem_path).unwrap();
    let mut key_file = File::create(key_path).unwrap();

    pem_file.write_all(pem.as_bytes()).unwrap();
    key_file.write_all(key.as_bytes()).unwrap();
}
```

### Simple Server with TLS

```rust
use axum::{routing::get, Router};
use axum_server::tls_rustls::RustlsConfig;
use std::{net::SocketAddr, path::PathBuf};

#[tokio::main]
async fn main() {
    let https_port = 8080;
    rustls::crypto::ring::default_provider()
        .install_default()
        .expect("Failed to install default CryptoProvider");
    let handle = axum_server::Handle::new();
    let config = RustlsConfig::from_pem_file(
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("cert.pem"),
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("key.pem"),
    )
    .await
    .unwrap();
    let app = Router::new().route("/", get(handler));
    let addr = SocketAddr::from(([127, 0, 0, 1], https_port));
    tracing::debug!("listening on {addr}");
    axum_server::bind_rustls(addr, config)
        .handle(handle)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> &'static str {
    "Hello, World!"
}
```

For full examples with http redirect and graceful shutdown, go to Axum's GitHub repo which contains TLS examples.

### Query HTTPS

To query a https server with self-signed cert, you would usually get errors.

To do it in Rust with `reqwest`, set `.danger_accept_invalid_certs(true)`.

```rust
use reqwest::Client;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a custom client
    let client = Client::builder()
        .danger_accept_invalid_certs(true)
        .build()?;

    // Make the request
    let response = client
        .get("https://localhost:3000")
        .send()
        .await?;

    println!("Status: {}", response.status());
    println!("Body: {}", response.text().await?);

    Ok(())
}
```

In Node.js and Bun, need to set environment variable `NODE_TLS_REJECT_UNAUTHORIZED=0`, but this will disable security check for entire program, not just a single request.
