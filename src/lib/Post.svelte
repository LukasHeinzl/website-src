<script>
    import SvelteMarkdown from "svelte-markdown";
    import Tags from "$lib/Tags.svelte";
    import ArrowLeftThin from "svelte-material-icons/ArrowLeftThin.svelte";
    import ArrowRightThin from "svelte-material-icons/ArrowRightThin.svelte";
    import {TextUtils} from "$lib/utils.js";
    import '../post.css'

    export let type;
    export let src;

    async function loadPost() {
        let data = await fetch("/posts/" + type + "/data.json");

        if (data.ok) {
            data = await data.json()
            let post = data.posts[src];
            let keys = Object.keys(data.posts);
            let idx = keys.indexOf(src);

            if (idx > 0) {
                post.previousPost = data.posts[keys[idx - 1]];
                post.previousPostHref = keys[idx - 1];
            }

            if (idx > -1 && idx < keys.length - 1) {
                post.nextPost = data.posts[keys[idx + 1]];
                post.nextPostHref = keys[idx + 1];
            }

            let text = await fetch("/posts/" + type + "/" + src + ".md");
            post.content = await text.text();
            return post;
        }

        throw new Error();
    }
</script>

{#await loadPost(src) then post}
    <h1>{post.title}</h1>
    <div id="metadata">
        <span class="published">Published: {post.published}</span>
        <Tags tags={post.tags}/>
    </div>
    <span class="post-content">
        <SvelteMarkdown source={post.content}/>
    </span>

    <div class="prevNext">
        {#if post.previousPost}
            <a href="../{post.previousPostHref}/" class="prev" title="Go to previous post: '{post.previousPost.title}'">
                    <span class="arrow"><ArrowLeftThin/></span>
                <span class="caption">
                    <span class="title">{TextUtils.limit(post.previousPost.title, 40)}</span>
                    <span class="type">Previous</span>
                </span>
            </a>
        {:else}
            <span></span>
        {/if}

        {#if post.nextPost}
            <a href="../{post.nextPostHref}/" class="next" title="Go to next post: '{post.nextPost.title}'">
                <span class="caption">
                    <span class="title">{TextUtils.limit(post.nextPost.title, 40)}</span>
                    <span class="type">Next</span>
                </span>
                <span class="arrow"><ArrowRightThin/></span>
            </a>
        {:else}
            <span></span>
        {/if}
    </div>
{:catch e}
    An error occurred during loading {e}
{/await}

<style>
    #metadata {
        margin-bottom: 1rem;
    }

    .prevNext {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: .5rem;
        margin-top: 2rem;
    }

    .prevNext > a {
        color: var(--accent-col);
        border-color: var(--accent-col);
        display: flex;
        flex-flow: row nowrap;
        gap: .7rem;
        padding-bottom: .5rem;
        align-items: center;

        transition: all 200ms ease-out;
    }

    .prevNext > a:hover {
        filter: brightness(.8);
    }

    .prevNext .caption {
        display: flex;
        flex-flow: column nowrap;
        gap: .2rem;
    }

    .prevNext .prev {
        min-width: 10rem;
    }

    .prevNext .next {
        text-align: right;
    }

    .prevNext .type {
        font-weight: bold;
    }

    .prevNext .title {
        font-size: 1rem;
        opacity: .8;
        font-style: italic;
    }

    .prevNext .arrow {
        font-size: 1.5rem;
    }
</style>