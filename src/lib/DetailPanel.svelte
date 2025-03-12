<script lang="ts">
    import { slide, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { findTechDetails, hexToRgb } from './utils';
    
    export let selectedItem: {
        title: string;
        company: string;
        startDate: Date;
        endDate: Date | null;
        description: string;
        skills: string[];
    };
    
    export let isMobile = false;

    export let itemPosition = 0;
    export let scrollY = 0;

    export let side = 'right';

    $: storedSide = side;
    
    let currentScrollY = scrollY;

    $: panelTop = isMobile ? 'auto' : `${itemPosition}%`;
    
    // Track touch start position for swipe to dismiss
    let touchStartY = 0;
    let touchDeltaY = 0;
    let isDragging = false;
    let panelElement: HTMLElement;
    
    // Format date for display
    function formatDate(date: Date) {
        if (!date) return "Present";
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // Create dispatcher for events back to parent
    const dispatch = createEventDispatcher();
    
    function handleScroll() {
        if (!isMobile) {
            currentScrollY = window.scrollY;
        }
    }
    
    onMount(() => {
        if (!browser) return;
        
        if (!isMobile) {
                window.addEventListener('scroll', handleScroll);
        }

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
            
            if (isMobile) {
                document.addEventListener('touchstart', handleTouchStart, { passive: true });
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
                document.addEventListener('touchend', handleTouchEnd, { passive: true });
            }
        }, 0);
        
        if (isMobile) {
            document.body.style.overflow = 'hidden';
        }
    });
    
    onDestroy(() => {
        if (!browser) { return; }

        if (!isMobile) {
            window.removeEventListener('scroll', handleScroll);
        }

        document.removeEventListener('click', handleClickOutside);
        
        if (isMobile) {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            
            document.body.style.overflow = '';
        }
    });

    function handleClickOutside(event: MouseEvent) {
        if (panelElement && !panelElement.contains(event.target as Node)) {
            closePanel();
        }
    }
    
    function handleTouchStart(event: TouchEvent) {
        if (!panelElement.contains(event.target as Node)) return;
        
        touchStartY = event.touches[0].clientY;
        isDragging = true;
        touchDeltaY = 0;
    }
    
    function handleTouchMove(event: TouchEvent) {
        if (!isDragging || !isMobile) return;
        if (!panelElement.contains(event.target as Node)) return;
        
        const currentY = event.touches[0].clientY;
        touchDeltaY = currentY - touchStartY;
        
        // Only allow dragging downward
        if (touchDeltaY > 0) {
            // Apply transform directly for smooth dragging
            panelElement.style.transform = `translateY(${touchDeltaY}px)`;
            
            // Prevent page scrolling while dragging
            event.preventDefault();
        }
    }
    
    function handleTouchEnd() {
        if (!isDragging || !isMobile) return;
        
        isDragging = false;
        
        // If dragged down significantly, close the panel
        if (touchDeltaY > 100) {
            closePanel();
        } else {
            // Reset position with animation
            panelElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            panelElement.style.transform = '';
            
            // Remove transition after animation completes
            setTimeout(() => {
                if (panelElement) {
                    panelElement.style.transition = '';
                }
            }, 300);
        }
    }

    // Close panel function that notifies parent
    function closePanel() {
        dispatch('close');
    }
    console.log(side);

    function getAnimationProps(isEntering: boolean) {
        if (isMobile) {
            // Mobile animations always slide up/down
            return {
                duration: isEntering ? 300 : 250,
                y: isEntering ? window.innerHeight : window.innerHeight,
                x: 0,
                easing: cubicOut
            };
        } else if (storedSide == 'right') {
            // Right side animations
            return {
                duration: isEntering ? 300 : 250,
                x: 0,
                y: isEntering ? 300 : 300, // Enter from right, exit to right
                easing: cubicOut
            };
        } else {
            // Left side animations
            console.log(side);
            return {
                duration: isEntering ? 300 : 250,
                x: 0,
                y: isEntering ? -300 : -300, // Enter from left, exit to left
                easing: cubicOut
            };
        }
    }
</script>

<div class="detail-panel" 
     class:mobile={isMobile}
     bind:this={panelElement}
     style={!isMobile ? `top: ${panelTop}; transform: translateY(-50%); ${side == 'right' ? 'right: 0px' : 'left: 0px'}` : ''} 
     in:fly={getAnimationProps(true)}
     out:fly={getAnimationProps(false)}>
    
    <!-- Pull indicator for mobile -->
    {#if isMobile}
        <div class="pull-indicator">
            <div class="pull-handle"></div>
        </div>
    {/if}
    
    <button class="close-btn" class:mobile={isMobile} on:click|stopPropagation={closePanel}>×</button>
    
    <div class="detail-content" class:mobile={isMobile}>
        <h2>{selectedItem.title}</h2>
        <h3>{selectedItem.company}</h3>
        <div class="detail-date">
            <strong>Duration:</strong> {formatDate(selectedItem.startDate)} - {formatDate(selectedItem.endDate || new Date())}
        </div>
        <div class="detail-description">
            <h4>Responsibilities & Achievements</h4>
            <p>{selectedItem.description}</p>
        </div>

        <!-- Use the skills from the selected item -->
        <div class="detail-skills">
            <h4>Skills & Technologies</h4>
            <div class="skill-tags">
                {#each selectedItem.skills as skill}
                    {@const tech = findTechDetails(skill)}
                    <span class="tech-tag" style="background-color: rgba({hexToRgb(tech.color || '#3c3c3c')}, 0.15);">
                        {#if tech.icon}
                            <span class="tech-icon">{@html tech.icon}</span>
                        {/if}
                        {tech.name}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .detail-panel {
        position:fixed;
        right: 2rem;
        width: 30vw;
        background-color: rgba(30, 30, 30, 0.95);
        border-radius: 8px;
        box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
        padding: 2rem;
        z-index: 100;
        overflow-y: auto;
        will-change: transform;
        max-height: 80vh;
    }
    
    .detail-panel.mobile {
        position: unset;
        right: 0;
        bottom: 0; 
        left: 0;
        width: 100%;
        height: 70vh;
        max-height: 80vh;
        border-radius: 16px 16px 0 0;
        box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.4);
        padding: 1.5rem;
        padding-top: 2.5rem;
        padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0.5rem));
        overflow: hidden;
        z-index: 1000;
    }
    
    .pull-indicator {
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }
    
    .pull-handle {
        width: 50px;
        height: 5px;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.3);
    }
    
    .close-btn.mobile {
        top: 1.5rem;
        right: 1.5rem;
        width: 36px;
        height: 36px;
        font-size: 1.8rem;
        background-color: rgba(60, 60, 60, 0.7);
        z-index: 1001;
    }
    
    .detail-content.mobile {
        margin-top: 0.5rem;
        height: calc(100% - 2rem);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;
    }

    .detail-content {
        position: relative;
        z-index: 2;
        min-height: 110px;
        padding: 15px 20px;
        background-color: rgba(24, 24, 24, 0.6);
        border-radius: 6px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .detail-content h2 {
        font: var(--h2);
        color: var(--selected-color);
        margin: 0;
    }

    .detail-content h3 {
        font: var(--h3);
        margin: 0;
        margin-top: 2rem;
    }

    .detail-date {
        margin: 0;
        margin-top: 0.2rem;
        font: var(--p);
        color: var(--gray70);
    }

    .detail-description h4 {
        font: var(--h4);
        margin: 0;
        margin-top: 2.5rem;
    }

    .detail-description p {
        font: var(--p);
        color: var(--gray80);
        margin: 0;
        margin-top: 0.5rem;
    }
    
    .detail-skills h4 {
        font: var(--h4);
        margin: 0;
        margin-top: 2rem;
        margin-bottom: 0.7rem;
    }
    
    @media screen and (max-width: 380px) {
        .detail-panel.mobile {
            height: 75vh;
        }
        
        .detail-content h2 {
            font-size: 1.5rem;
        }
        
        .detail-content h3 {
            font-size: 1.1rem;
        }
        
        .tech-tag {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
        }
    }
    
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background-color: rgba(60, 60, 60, 0.5);
        color: #fff;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
    }
    
    
    .close-btn:hover {
        background-color: rgba(80, 80, 80, 0.8);
    }
    
    .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0;
    }
    
    .tech-tag {
        display: inline-flex;
        align-items: center;
        background-color: rgba(60, 60, 60, 0.5);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }
    
    .tech-icon {
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }
</style>