---
title: MacOS Purgeable Space Problem (solved with Daisy Disk)
author: HK
tags: [MacOS, OS, Software, Daisy Disk]
date: 2023-01-15
---

![](https://hacker-storage.s3.us-east-2.amazonaws.com/2023/1/16/fc2979b0-2416-4fd6-818c-75f0a3ae8ae3.png)

## Problem Description

I encountered a weird problem with MacOS storage.

I wanted to install a MacOS VM with Parallels Desktop, but was unable to. The error message says I don't have enough space (at least 49.13G) on disk.
But storage displayed in preference tells me I have more than 500GB of space, and I just cleaned the storage.

Although preference says that I have space, other places give me different result.

`df -h .` says my disk usage is 97%

In disk utility, my disk usage is displayed to be 942.28/994.66GB.

<img src="https://hacker-storage.s3.us-east-2.amazonaws.com/2023/1/16/1d7d361a-625a-42c5-8224-af29d77e5fc4.png" />

Right click on the disk -> `Get Info`. The purgeable space section takes ~500GB of space.

Usually, Mac should handle it. Space should be freed while needed, but not here. 

MacOS doesn't seem to provide a option to manually purge space, so I have to use a third party software. 

How stupid is this?

## Readings and Solutions

- [MacPaw purge space](https://macpaw.com/how-to/purgeable-space-on-macos?campaign=cmmx_search_rlsa_seo_ww_en&ci=10007341835&adgroupid=101182092415&adpos=&ck=macos%20purgeable%20space&targetid=aud-300364119343:kwd-896663771466&match={if:e}&gnetwork=g&creative=434162957733&placement=&placecat=&accname=cmm&gclid=CjwKCAiA5Y6eBhAbEiwA_2ZWIYn9OWp-Pf_nI-tv50hjeCPd_Fd_eQN3c_MsoXhn10hI8kjNFXJl5RoCxQsQAvD_BwE)
- [DaisyDisk -> Purgeable Space](https://daisydiskapp.com/manual/4/en/Topics/PurgeableSpace.html)

With DaisyDisk, you can find the purgeable space visually. Drag it to the button at the bottom, and delete. Then the purgeable space will be purged.

![](https://hacker-storage.s3.us-east-2.amazonaws.com/2023/1/16/97831ca4-5c32-4966-8c5e-7788e95aa696.png)

### Result

![](https://hacker-storage.s3.us-east-2.amazonaws.com/2023/1/16/14828580-c58f-4da1-b256-c921c8d4f616.png)