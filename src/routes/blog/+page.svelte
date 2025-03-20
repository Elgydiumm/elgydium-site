<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { blogPosts } from '$lib/data/blogposts';
    import { writable } from 'svelte/store';
    import { findTechDetails, hexToRgb } from '$lib/utils';

    type BlogPost = {
        id: string;
        title: string;
        date: Date;
        summary: string;
        content: string;
        image?: string;
        tags: string[];
    };
    
    let mounted = false;

    const sortedBlogPosts = [...blogPosts].sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
    
    // Function to format dates nicely
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
    
    const selectedPost = writable<BlogPost | null>(null);

    let isMobile = false;

    onMount(() => {
        isMobile = window.innerWidth <= 768;
        
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
        };
        
        window.addEventListener('resize', handleResize);
        
        selectedPost.set(null);
        mounted = true;
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    
    // Staggered delay
    function getInitialDelay(index: number) {
        return 150 + (index * 100);
    }
</script>

<div class="blog-container">
    <h1 class="page-title" in:fade={{duration: 600, delay: 400}}>Blog</h1>
    
    <div class="blog-grid">
        {#each sortedBlogPosts as post, index (post.id)}
            <div class="blog-card-container">
                {#if mounted}
                    <a 
                        class="blog-card"
                        in:fly={{y: 30, duration: 600, delay: getInitialDelay(index), easing: cubicOut}}
                        href={`/blog/${post.id}`}
                        tabindex="0">
                        
                        <div class="blog-content">
                            <div class="blog-date">{formatDate(post.date)}</div>
                            <h2>{post.title}</h2>
                            <p class="blog-summary">{post.summary}</p>
                            
                            <div class="tag-preview">
                                {#each post.tags.slice(0, 2) as tag, i}
                                    {@const tech = findTechDetails(tag)}
                                    {#if tech}
                                        <!-- Technology tag with icon and color -->
                                        <span class="tag tech-tag" style="background-color: rgba({tech.color ? hexToRgb(tech.color) : '0,0,0'}, 0.15);">
                                            {#if tech.icon}
                                                <span class="tech-icon">{@html tech.icon}</span>
                                            {/if}
                                            {tech.name}
                                        </span>
                                    {:else}
                                        <!-- Regular tag -->
                                        <span class="tag">{tag}</span>
                                    {/if}
                                {/each}
                                {#if post.tags.length > 2}
                                    <span class="more-tag">+{post.tags.length - 2}</span>
                                {/if}
                            </div>
                        </div>
                    </a>
                {/if}
            </div>
        {/each}
    </div>
    
</div>

<style>
    .blog-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
    }

    .page-title {
        font-size: 3rem;
        margin-bottom: 2rem;
        text-align: center;
        color: var(--selected-color);
    }

    .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .blog-card-container {
        height: 380px;
        transition: opacity 0.3s ease;
    }

    .blog-card {
        background-color: rgba(24, 24, 24, 0.6);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        cursor: pointer;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        will-change: transform, opacity;
        text-decoration: none;
        color: inherit;
    }

    .blog-card:not(.expanded):hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        background-color: rgba(24, 24, 24, 0.9);
    }

    .blog-card:focus {
        outline: 2px solid var(--selected-color);
    }
    
    .blog-content {
        padding: 1.5rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .blog-date {
        font-size: 0.85rem;
        color: var(--unselected-color);
        margin-bottom: 0.5rem;
    }

    .blog-content h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
        color: var(--selected-color);
    }

    .blog-summary {
        margin-bottom: auto;
        color: var(--unselected-color);
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .tag-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1.5rem;
    }

    .tag, .more-tag {
        background-color: rgba(60, 60, 60, 0.5);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }
    
    .tech-tag {
        display: inline-flex;
        align-items: center;
    }
    
    .tech-icon {
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }

    .more-tag {
        background-color: rgba(30, 255, 0, 0.15);
        color: var(--selected-color);
    }

    @media screen and (max-width: 768px) {
        .blog-grid {
            grid-template-columns: 1fr;
        }
    }
</style>