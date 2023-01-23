<script>
    import Tags from "$lib/Tags.svelte";

    export let href;
    export let post;
</script>

<a href="{href}/" class="postListEntry">
    <h2 class="h3">{post.title}</h2>
    <div>
        <span>Published: {post.published}</span>
        <Tags tags={post.tags}/>
    </div>
</a>

<style>
    h2 {
        border-top: 1px solid lightgray;
    }

    div {
        border-bottom: 1px solid lightgray;
    }

    a:hover > h2 {
        border-top: 1px solid var(--hover-col);
    }

    a:hover div {
        border-bottom: 1px solid var(--hover-col);
    }

    a.postListEntry:hover > div :global(.hover) {
        background: var(--hover-col);
    }
</style>