"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

const DEFAULT_QUESTION = "What skills does Huakun have?";

export function AIChatDialog({ className }: { className?: string }) {
	const [question, setQuestion] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const body = JSON.stringify({
			question:
				question.trim().length === 0 ? DEFAULT_QUESTION : question.trim(),
		});
		console.log(body);
		fetch("/api/askai", {
			method: "POST",
			body,
		})
			.then((res) => res.json())
			.then((data) => {
				setResponse(data.answer);
			})
			.finally(() => setLoading(false));
	}
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<h2 className="text-2xl font-bold">Ask AI About Me</h2>
			<form onSubmit={onSubmit} className="flex gap-2">
				<Input
					placeholder={DEFAULT_QUESTION}
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
				/>
				<Button type="submit">Ask</Button>
			</form>
			{loading ? (
				<div className="flex justify-center items-center h-full">
					<LoaderCircleIcon className="animate-spin" />
				</div>
			) : (
				<article className="prose dark:prose-invert text-left">
					<Markdown>{response}</Markdown>
				</article>
			)}
		</div>
	);
}
