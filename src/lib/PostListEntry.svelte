<script>
    import Tags from "$lib/Tags.svelte";
    import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
    import {page} from "$app/stores";

    export let href;
    export let post;

    let viewCaption;
    $: viewCaption = $page.params.type === 'projects' ? 'View project' : 'Read post';

</script>

<article class="postListEntry">
    <h2 class="h3 title">
        <a href="{href}">{post.title}</a>
    </h2>
    <div>
        <span class="published">Published: {post.published}</span>
        <Tags tags={post.tags}/>
    </div>
    <a href="{href}" class="view-post">
        <ChevronRight/> {viewCaption}
    </a>
</article>

<style>
    article {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        padding: unset;
    }

    .title {
        font-weight: bold;
        padding: 0;
        margin-top: 0;
    }

    .title a {
        color: var(--text-main);
        border-color: transparent;
    }

    .title a:hover {
        color: var(--accent-col);
        border-color: var(--accent-col);
    }

    .published {
        opacity: .7;
        font-size: .9rem;
    }

    .view-post {
        color: var(--accent-col);
        border-color: var(--accent-col);
        margin-top: 1rem;

        transition: filter 200ms ease-out;
    }

    .view-post:hover {
        filter: brightness(.8);
    }

</style>