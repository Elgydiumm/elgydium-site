<script lang="ts">
    import BlogPost from '$lib/BlogPost.svelte';
    import { blogPosts } from '$lib/data/blogposts.js';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { cubicOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { browser } from '$app/environment';

    const postId = $page.params.id;

    const selectedPost = blogPosts.find(p => p.id === postId) || {
        id: '404',
        title: 'Post Not Found',
        date: 'Error',
        summary: 'This post could not be found.',
        content: `<p>We couldn't find the post you were looking for. Please return to the blog index.</p>`,
        image: '/images/blog-placeholder.jpg',
        tags: ['Error']
    };
    
    function goBack(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (browser) {
            document.getElementById('expanded-overlay')?.style.setProperty('height','0px');
        }
        goto('/blog');
    }
    </script>


<div 
            class="expanded-overlay"
            id="expanded-overlay"
            transition:fade={{duration: 250}}>
            
            <div 
                class="blog-card expanded"
                in:fly={{y: -30, duration: 400, easing: cubicOut}}
                out:fly={{y: -30, opacity: 0, duration: 300, easing: cubicOut}}>
                
                <a href="/blog" id="blog" class="close-btn" on:click={goBack}><u>Go Back</u></a>
                
                <div class="blog-image expanded" style="background-image: url('{selectedPost.image || ''}')">
                    <div class="blog-overlay"></div>
                    <h1 class="expanded-title">{selectedPost.title}</h1>
                    <div class="expanded-date">{selectedPost.date}</div>
                </div>
                
                <div class="detail-container">
                    <div class="fade-edge top"></div>
                    
                    <div class="scrollable-content">
                        <BlogPost post={selectedPost} />
                    </div>
                    
                    <div class="fade-edge bottom"></div>
                </div>
            </div>
        </div>

<style>
    .close-btn {
        top: 1rem;
        right: 1rem;
        color: var(--selected-color);
        font-size: 1.5rem;
        text-decoration: none;
        z-index: 100;
    }
</style>