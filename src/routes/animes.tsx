import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/animes')({
    component: Animes,
})

function Animes() {
    return <h1>Hello from anime</h1>
}
