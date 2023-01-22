<script>
    import SvelteMarkdown from "svelte-markdown";
    import Tags from "$lib/Tags.svelte";

    export let type;
    export let src;

    async function loadPost() {
        let data = await fetch("/posts/" + type + "/data.json");

        if (data.ok) {
            data = (await data.json()).posts[src];

            let text = await fetch("/posts/" + type + "/" + src + ".md");
            data.content = await text.text();
            return data;
        }

        throw new Error();
    }
</script>

{#await loadPost(src) then post}
    <h1>{post.title}</h1>
    <div>
        <span>Published: {post.published}</span>
        <Tags tags={post.tags}/>
    </div>
    <SvelteMarkdown source={post.content}/>
{:catch e}
    An error occurred during loading {e}
{/await}

<style>

</style>