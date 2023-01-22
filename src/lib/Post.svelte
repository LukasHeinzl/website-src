<script>
    import Label from "svelte-material-icons/Label.svelte";

    export let href;
    export let post;
</script>

<a {href}>
    <h2 class="h3">{post.title}</h2>
    <div>
        <span>Published: {post.published}</span>
        <div class="tags">
            <Label/> Tags:
            <div class="list">
                {#each post.tags as tag}
                    <span>{tag}</span>
                {:else}
                    None
                {/each}
            </div>
        </div>
    </div>
</a>

<style>
    a {
        text-decoration: none;
        color: var(--link-col);
    }

    a:hover {
        color: var(--hover-col);
    }

    h2 {
        border-top: 1px solid lightgray;
    }

    a:hover > h2 {
        border-top: 1px solid var(--hover-col);
    }

    .tags {
        display: flex;
        align-items: center;
        border-bottom: 1px solid lightgray;
        padding: 0.4rem 0;
    }

    .tags > .list {
        margin-left: 0.5rem;
        display: flex;
        gap: 0.5rem
    }

    .tags > .list > span {
        background: var(--link-col);
        color: white;
        padding: 0.3rem 0.7rem;
        border-radius: 0.4rem;
    }

    a:hover .tags {
        border-bottom: 1px solid var(--hover-col);
    }

    a:hover .tags > .list > span {
        background: var(--hover-col);
    }
</style>