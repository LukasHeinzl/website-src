<script>
    export let type;
    export let src;

    async function loadPost() {
        let data = await fetch("/posts/" + type + "/data.json");

        if (data.ok) {
            data = (await data.json()).posts[src];

            let text = await fetch("/posts/" + type + "/" + src + ".md");

            if (data.ok) {
                data.contents = await text.text();
                return data;
            }

            throw new Error();
        }

        throw new Error();
    }
</script>

{#await loadPost(src) then post}
    <h1>{post.title}</h1>
{:catch e}
    An error occurred during loading
{/await}