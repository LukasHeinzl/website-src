<script>
    import {page} from "$app/stores";
    import Post from "$lib/Post.svelte";
</script>

<Post type={$page.params.type} src={$page.params.post}/>