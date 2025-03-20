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
        date: new Date(Date.now()),
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

    function formatDate(dateInput: Date) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateInput; // Return original string if it couldn't be parsed
        }
        
        // Format: Month Day, Year
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en', options);
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
                    <div class="expanded-date">{formatDate(selectedPost.date)}</div>
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
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: var(--selected-color);
        font-size: 1.5rem;
        text-decoration: none;
        z-index: 100;
    }

    .blog-image.expanded {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        background-size: cover;
        margin-bottom: 1.5rem;
    }
    
    .detail-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
        position: relative;
    }
    
    .scrollable-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: start;
    }

    .expanded-overlay {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 2rem;
    }
    
    .blog-card.expanded {
        max-width: 900px;
        width: 90%;
        margin: 0 auto;
    }
</style>