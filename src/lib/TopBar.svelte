<script lang="ts">
    import { page } from '$app/stores'; 
    import { derived } from 'svelte/store';
    import { onMount } from 'svelte';

    let hamburgerOpen = false;
    let isMobile = false;
    
    onMount(() => {
        isMobile = window.innerWidth <= 768;
        
        // Update on resize
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
            if (!isMobile) hamburgerOpen = false;
        };
        
        window.addEventListener('resize', handleResize);
        
        // Close menu when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            const nav = document.querySelector('.topnav');
            const hamburger = document.querySelector('.menu-icon');
            if (!nav) return;
            if (hamburgerOpen && 
                e.target !== nav && 
                e.target instanceof Node && !nav.contains(e.target) && 
                e.target !== hamburger) {
                hamburgerOpen = false;
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    });

    function toggleHamburger() {
        hamburgerOpen = !hamburgerOpen;
        
        // Prevent body scrolling when menu is open on mobile
        if (isMobile) {
            document.body.style.overflow = hamburgerOpen ? 'hidden' : '';
        }
    }

    const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<nav class="topnav">
  <div class="menu-icon" role="button" tabindex="0" 
       class:active={hamburgerOpen}
       on:click={toggleHamburger} 
       on:keydown={(e) => e.key === 'Enter' && toggleHamburger()}>
      <span></span>
      <span></span>
      <span></span>
  </div>
  
  <ul class="nav-links" class:show={hamburgerOpen}>
      <li>
          <a href="/" class="nav-link" class:active={$currentPath === "/"} on:click={toggleHamburger}>
              <span>Main Page</span>
          </a>
      </li>
      <li>
          <a href="/projects" id="projects" class="nav-link" class:active={$currentPath === "/projects"} on:click={toggleHamburger}>
              <span>Projects</span>
          </a>
      </li>
      <li>
          <a href="/blog" id="blog" class="nav-link" class:active={$currentPath.startsWith("/blog")} on:click={toggleHamburger}>
              <span>Blog</span>
          </a>
      </li>
  </ul>
</nav>
<div class="gradient-container">
    <div class="gradient"></div>
</div>

<style>
    .gradient-container {
        position: fixed;
        top: 50px; /* Position right below the top bar */
        left: 0;
        right: 0;
        z-index: 100;
        height: 0; /* No height itself */
        pointer-events: none; /* Allow clicks to pass through */
    }

    .gradient {
        width: 100%;
        height: 30px; /* Taller gradient for smoother transition */
        background: linear-gradient(to bottom, 
            var(--main-color) 0%, 
            color-mix(in srgb, var(--main-color) 70%, var(--background-color) 30%) 40%,
            color-mix(in srgb, var(--main-color) 30%, var(--background-color) 70%) 70%, 
            var(--background-color) 100%);
    }

    .topnav {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        z-index: 1000;
        box-sizing: border-box;
    }

    .nav-links {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        margin: 0;
        list-style: none;
        font-size: 17px;
        gap: 15px;
    }

    .nav-link {
        display: block;
        color: var(--unselected-color);
        text-align: center;
        padding: 10px 16px;
        text-decoration: none;
        font-size: 17px;
        border-radius: 4px;
        background-color: transparent;
        transition: color 0.3s ease;
        position: relative;
        box-sizing: border-box;
    }

    .nav-link span {
        position: relative;
        z-index: 1;
    }

    .nav-link:hover,
    .nav-link.active {
        color: var(--selected-color);
    }

    .menu-icon {
        display: none;
        cursor: pointer;
        width: 30px;
        height: 22px;
        position: absolute;
        right: 20px;
        top: 14px;
        z-index: 1100;
        transition: all 0.3s ease;
    }
    
    .menu-icon span {
        display: block;
        height: 2px;
        width: 100%;
        background: var(--unselected-color);
        position: absolute;
        transition: all 0.3s ease;
    }
    
    .menu-icon span:nth-child(1) {
        top: 0;
    }
    
    .menu-icon span:nth-child(2) {
        top: 10px;
    }
    
    .menu-icon span:nth-child(3) {
        top: 20px;
    }
    
    /* Hamburger animation */
    .menu-icon.active span:nth-child(1) {
        transform: rotate(45deg);
        top: 10px;
        background: var(--selected-color);
    }
    
    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-icon.active span:nth-child(3) {
        transform: rotate(-45deg);
        top: 10px;
        background: var(--selected-color);
    }
    
    /* Mobile Styles */
    @media screen and (max-width: 768px) {
        .menu-icon {
            display: block;
        }

        .nav-links {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: -100%;
            left: 0;
            width: 100%;
            padding: 60px 0 20px;
            background-color: var(--main-color);
            text-align: center;
            box-sizing: border-box;
            height: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            gap: 0;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            opacity: 0;
        }
    
        .nav-links.show {
            top: 0;
            opacity: 1;
        }

        .nav-links li {
            width: 100%;
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            transition-delay: 0ms;
        }
        
        .nav-links.show li {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.show li:nth-child(1) { transition-delay: 150ms; }
        .nav-links.show li:nth-child(2) { transition-delay: 200ms; }
        .nav-links.show li:nth-child(3) { transition-delay: 250ms; }

        .nav-link {
            width: 100%;
            padding: 15px 0;
            font-size: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: block;
        }
        
        .nav-link:active {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .topnav {
            justify-content: flex-start;
        }
    }
</style>