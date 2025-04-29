<script lang="ts">
    interface Project {
        id: number;
        title: string;
        summary: string;
        description: string;
        previewImage: string;
        images: string[];
    }
    // Project data
    const projects = [
    {
      id: 1,
      title: "KU1 - Kahden maalauksen yhdistäminen",
      summary: "Kuviksen työ jossa yhdistettiin kaksi maalausta yhdeksi jumalaisen vision avittamana.",
      description: "Tämä maalaus yhdistää teokset The Scream ja Ihmisen omena. Teosta tehdessä sain jumalaisen vision, siitä mitä teoksessa tapahtuu. Valaistuin, kun ymmärsin, että teoksessa ilmiselvästi kävelee kiljujan ohi lapsi äitineen, ja kiljuja on pedofiili, joka kiljuu koska ei pystynyt saamaan lasta itselleen. Sen takia hänen nenänsä on omena. He ovat kivitiilikaiteisella sillalla, joka kuvastaa pedofiilin vankeutta sosiaalisissa normeissa, mutta kävelyalustana on puu, joka taasen kuvastaa lapsen pelastettua sivellisyyttä ja elämää. Taivaan myrskypilvet ilmaisevat, miten myrsky melkein tapahtui lapsen lähes uhriutuessa, mutta miten ukkonen ja sade ei koskaan laskeutunut äidin tuoman turvan ansiosta.\n\nTeoksen tekeminen oli haastavaa, sillä aloitin jo valmiiksi myöhässä ja en osannut yhtään. Sitten jumalainen jumala, meidän HERRAmme ilmestyi eteeni ja kertoi minulle että minun pitäisi piirtää siitä juuri tämänlainen. Työ oli rnakkaa, ja vaati monia kompromisseja taitojeni ja jaksamiseni puutteessa, mutta lopulta puskin maaliin asti!",
      previewImage: "/kuvis/kaksi_maalausta.jpg",
      images: [
        "/kuvis/kaksi_maalausta.jpg",
      ]
    } as Project,
    {
      id: 2,
      title: "KU1 - Kansi",
      summary: "Portfolio-kansio abstraktilla taiteella",
      description: "Kansityö kuvastaa ihmissielun syvällisyyttä ja monivärillisyyttä, niistä vaaleista hienoista hetkistä ja tunteista niihin rumimpiin ja tummimpiin.",
      previewImage: "/kuvis/kansi.jpg",
      images: [
        "/kuvis/kansi.jpg"
      ]
    } as Project,
    {
      id: 3,
      title: "KU1 - Kultainen leikkaus",
      summary: "Tehtävä jossa sovelletaan kultaisen leikkauksen periaatteita sommittelussa",
      description: "Työssä kultaista leikkausta sovellettiin erilaisten autojen muodossa, mutta kolmannen kuvan kohdalla löysin liian siistin kuvan auton ikkunan läpi joten laitoin sen sinne, jossa lato ja puulinja ovat kultaisessa leikkauksessa.",
      previewImage: "/kuvis/kultainenleikkaus2.jpg",
      images: [
        "/kuvis/kultainenleikkaus1.jpg",
        "/kuvis/kultainenleikkaus2.jpg",
        "/kuvis/kultainenleikkaus3.jpg"
      ]
    } as Project,
    {
      id: 4,
      title: "KU1 - Lyijykynäpiirros",
      summary: "L-kirjainta hyödyntävä sommittelu- ja muotoharjoitus",
      description: "Tehtävässä taiteilin yksinkertaisen kolmiuloitteisen L-kirjaimen, joka kaikessa soreudessa kuvastaa jokaisen elämää, hieno edestäpäin, mutta kun sitä lähtee tulkitsemaan se on vain suuri tappio.",
      previewImage: "/kuvis/L.jpg",
      images: [
        "/kuvis/L.jpg"
      ]
    } as Project,
    {
      id: 5,
      title: "KU2 - Pakopistetyö",
      summary: "Perspektiiviharjoitus pakopisteen avulla",
      description: "Pakopistetyössä harjoittelin perspektiivin luomista käyttäen yhtä pakopistettä. Kuvassa on erilaisia huonekaluja, ja taulu joka on täydellisessä pakopisteperspektiivissä niin, että se näyttää olevan littana teoksessani.",
      previewImage: "/kuvis/pakopiste.jpg",
      images: [
        "/kuvis/pakopiste.jpg"
      ]
    } as Project,
    {
      id: 6,
      title: "KU2 - Tuoli",
      summary: "Tuoli luonnon materiaaleista.",
      description: "Tässä tehtävässä loin tuolin alkaen tukista, joka kuvastaa kaikkia hauskoja lyhyitä hetkiä ystävien kanssa, kuten nuotion ääressä istumista. Tämä tukki on suksien päällä, jotka symboloivat elämän vauhdikkuutta, ja sitä miten nopeasti nämä hyvät hetket kaikkoavat meiltä ja palaamme takaisin arkeen.",
      previewImage: "/kuvis/tuoli_1.jpg",
      images: [
        "/kuvis/tuoli_1.jpg",
        "/kuvis/tuoli_2.jpg",
        "/kuvis/tuoli_3.jpg",
        "/kuvis/tuoli_4.jpg",
        "/kuvis/tuoli_5.jpg",
        "/kuvis/tuoli_6.jpg",
      ]
    } as Project,
    {
      id: 7,
      title: "KU2 - Luontoasetelma",
      summary: "Asetelman luominen luonnon elementeistä",
      description: "Luontoasetelmassa asettelin kepit kiekuraiseksi melkein kuin labyrintiksi maahan. Teos on tehty ruskeilla tikuilla ruskeita lehtiä vasten, piilottamaan sen, kuten kaikkien omat labyrintit piiloutuvat muun elämän ruskeuden taakse, pois toisten nähtävistä.",
      previewImage: "/kuvis/asetelma_1.jpg",
      images: [
        "/kuvis/asetelma_1.jpg",
        "/kuvis/asetelma_2.jpg",
        "/kuvis/asetelma_3.jpg",
        "/kuvis/asetelma_4.jpg"
      ]
    } as Project
    ];
  
    // State for tracking which project is expanded
    let expandedProjectId: number | null = $state(null);
    let isSidebarOpen: boolean = $state(false);
    
    // State for lightbox
    let lightboxOpen: boolean = $state(false);
    let currentLightboxImage: string = $state('');
    let currentLightboxIndex: number = $state(0);
    let currentProject: Project | null = $state(null);
    
    function toggleSidebar() {
      isSidebarOpen = !isSidebarOpen;
    }
  
    // Toggle project expansion
    function toggleProject(id: number) {
      expandedProjectId = expandedProjectId === id ? null : id;
      
      // When expanding, set focus to the expanded content for accessibility
      if (expandedProjectId !== null) {
        isSidebarOpen = false;

        setTimeout(() => {
          const expandedHeader = document.querySelector('.expanded-header h3');
          if (expandedHeader) {
            (expandedHeader as HTMLElement).focus();
          }
        }, 100);
      }
    }
    
    // Handle keyboard navigation
    function handleKeydown(event: KeyboardEvent, id: number) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleProject(id);
      } else if (event.key === 'Escape' && expandedProjectId === id) {
        toggleProject(id);
      }
    }

    // Helper function to determine if a collection is large
    function isLargeCollection(images: string[]): boolean {
      return images.length > 3;
    }
    
    // Open the lightbox for a specific image - improved handler
    function openLightbox(project: Project, imageIndex: number) {
        console.log('Opening lightbox for image', imageIndex);
        currentProject = project;
        currentLightboxIndex = imageIndex;
        currentLightboxImage = project.images[imageIndex];
        lightboxOpen = true;
        
        // Prevent scrolling on body when lightbox is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close the lightbox
    function closeLightbox() {
        lightboxOpen = false;
        
        // Restore scrolling
        document.body.style.overflow = '';
    }
    
    // Navigate to the next image in the current project
    function nextImage() {
        if (!currentProject) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % currentProject.images.length;
        currentLightboxImage = currentProject.images[currentLightboxIndex];
    }
    
    // Navigate to the previous image in the current project
    function prevImage() {
        if (!currentProject) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + currentProject.images.length) % currentProject.images.length;
        currentLightboxImage = currentProject.images[currentLightboxIndex];
    }
    
    // Handle keyboard navigation in lightbox
    function handleLightboxKeydown(event: KeyboardEvent) {
        if (!lightboxOpen) return;
        
        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    }
</script>

<svelte:window on:keydown={handleLightboxKeydown} />

<main>
    <aside class="side-nav" class:visible={isSidebarOpen}>
        <div class="side-nav-header">
          <h3>Työt</h3>
          <button class="close-sidebar" on:click={toggleSidebar} aria-label="Close sidebar">×</button>
        </div>
        
        <nav>
          <ul class="project-list">
            {#each projects as project}
              <li>
                <button 
                  class="nav-item" 
                  class:active={expandedProjectId === project.id}
                  on:click={() => toggleProject(project.id)}
                  aria-pressed={expandedProjectId === project.id}
                >
                  <div class="nav-item-thumbnail">
                    <img src={project.previewImage} alt="" aria-hidden="true" />
                  </div>
                  <span class="nav-item-title">{project.title}</span>
                </button>
              </li>
            {/each}
          </ul>
        </nav>
    </aside>

    <button class="sidebar-toggle" on:click={toggleSidebar} aria-label="Toggle project navigation">
        <span class="hamburger"></span>
    </button>

    <div class="content-area">
        <header>
            <h1>Portfolio - KU1 & KU2</h1>
            <h2>Eemeli Väljä</h2>
        </header>

        {#if expandedProjectId !== null}
            <!-- Expanded project view -->
            {#each projects.filter(p => p.id === expandedProjectId) as project}
                <div 
                  class="expanded-project" 
                  role="dialog" 
                  aria-modal="true" 
                  aria-labelledby={`project-title-${project.id}`}
                >
                  <div class="expanded-header">
                    <h3 id={`project-title-${project.id}`} tabindex="-1">{project.title}</h3>
                  </div>
                  
                  <div class="expanded-content">
                    <div class="description">
                      <p class="project-text">{project.description}</p>
                    </div>
                    <div class="gallery" class:large-collection={isLargeCollection(project.images)} role="group" aria-label="Project images">
                      {#each project.images as image, i}
                        <div 
                          class="gallery-image-wrapper"
                          on:click={() => openLightbox(project, i)}
                          on:keydown={(e) => e.key === 'Enter' && openLightbox(project, i)}
                          tabindex="0"
                          role="button"
                          aria-label="View larger image of {project.title} - Image {i+1}"
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${i+1}`} 
                            class="gallery-image" 
                            style="animation-delay: {i * 0.1}s"
                          />
                          <div class="gallery-image-overlay">
                            <span class="click-to-enlarge">Paina suurentaaksesi</span>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
            {/each}
        {:else}
            <!-- Welcome message -->
            <div class="welcome-message">
                <p>Valitse työ nähdäksesi sen tiedot.</p>
            </div>
        {/if}
    </div>

    <!-- Lightbox modal for enlarged images -->
    {#if lightboxOpen}
        <div class="lightbox" on:click={closeLightbox} role="dialog" aria-modal="true" aria-label="Image preview">
            <div class="lightbox-content" on:click|stopPropagation>
                <button class="lightbox-close" on:click={closeLightbox} aria-label="Close image preview">×</button>
                
                {#if currentProject && currentProject.images.length > 1}
                    <button class="lightbox-nav lightbox-prev" on:click={prevImage} aria-label="Previous image">
                        <span aria-hidden="true">&#10094;</span>
                    </button>
                    <button class="lightbox-nav lightbox-next" on:click={nextImage} aria-label="Next image">
                        <span aria-hidden="true">&#10095;</span>
                    </button>
                    <div class="lightbox-counter">
                        {currentLightboxIndex + 1} / {currentProject.images.length}
                    </div>
                {/if}
                
                <div class="lightbox-image-container">
                    <img src={currentLightboxImage} alt="Enlarged view" class="lightbox-image" />
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    :root {
      /* Dark theme color palette */
      --primary-color: #5e9eff;
      --secondary-color: #a56eff;
      --accent-color: #ff4a8d;
      --background-color: #121212;
      --card-background: #1e1e1e;
      --sidebar-background: #1a1a1a;
      --text-primary: #f0f0f0;
      --text-secondary: #cccccc;
      --focus-outline: 3px solid #5e9eff;
      --card-hover-bg: #262626;
      --card-border: #333333;
      --shadow-color: rgba(0, 0, 0, 0.6);
    }
    
    /* Layout container */
    main {
      display: flex;
      min-height: 100vh;
      position: relative;
      background-color: var(--background-color);
      color: var(--text-primary);
    }
    
    /* Content area styling enhancements */
    .content-area {
      flex: 1;
      padding: 2.5rem;
      margin-left: 250px;
      transition: margin-left 0.3s ease;
      overflow-x: hidden;
      background: linear-gradient(135deg, var(--background-color) 0%, rgba(30, 30, 40, 0.8) 100%);
    }
    
    /* Header styling improvements */
    header {
      text-align: center;
      margin-bottom: 3.5rem;
      animation: fadeInUp 0.8s ease-out forwards;
      position: relative;
      padding-bottom: 1.5rem;
    }
    
    header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 3px;
    }
    
    h1 {
      font-size: 2.8rem;
      margin-bottom: 0.7rem;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px rgba(94, 158, 255, 0.2);
      font-weight: 700;
      letter-spacing: 1px;
    }
    
    h2 {
      font-size: 1.6rem;
      color: var(--text-secondary);
      font-weight: normal;
      opacity: 0.9;
    }
    
    /* Welcome message enhancements */
    .welcome-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 60vh;
      font-size: 1.3rem;
      color: var(--text-secondary);
      text-align: center;
      animation: fadeInUp 0.8s ease-out forwards;
      background: rgba(30, 30, 40, 0.2);
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(94, 158, 255, 0.1);
    }
    
    .welcome-message p {
      max-width: 600px;
      line-height: 1.7;
    }
    
    .welcome-message::before {
      content: ':3';
      font-size: 3rem;
      margin-bottom: 1.5rem;
      animation: wave 2s infinite;
    }
    
    @keyframes wave {
      0%, 100% { transform: rotate(0); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
    }
    
    /* Expanded project styling - add scrolling */
    .expanded-project {
      position: relative;
      background: var(--background-color);
      z-index: 100;
      padding: 2.5rem;
      max-height: 85vh; /* Limit height to enable scrolling */
      overflow-y: auto; /* Add vertical scrolling */
      animation: scaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--card-border);
    }
    
    /* Ensure the gallery has proper spacing */
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
      gap: 2rem; /* Increased gap for better separation */
      margin-top: 1rem;
      margin-bottom: 2rem; /* Add bottom margin for scrolling space */
      width: 100%;
      justify-content: center;
    }
    
    /* Make sure images appear clearly */
    .gallery-image-wrapper {
      position: relative;
      cursor: pointer;
      max-width: 400px;
      margin: 0 auto;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
      margin-bottom: 1rem; /* Additional spacing between images */
    }
    
    .gallery-image-wrapper:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    .gallery-image {
      width: 100%;
      max-width: 400px;
      max-height: 400px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      transition: all 0.4s ease;
      animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-fill-mode: both;
      opacity: 0;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
    }
    
    .gallery-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 10px;
    }
    
    .gallery-image-wrapper:hover .gallery-image-overlay,
    .gallery-image-wrapper:focus-within .gallery-image-overlay {
        opacity: 1;
    }
    
    .click-to-enlarge {
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        transform: translateY(10px);
        transition: transform 0.3s ease;
    }
    
    .gallery-image-wrapper:hover .click-to-enlarge,
    .gallery-image-wrapper:focus-within .click-to-enlarge {
        transform: translateY(0);
    }
    
    /* Add a special layout for collections with many images */
    .gallery.large-collection {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
    }
    
    /* Remove different layouts for responsive design since we're capping at 400px */
    @media (min-width: 1200px) {
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
      }
    }
    
    /* Additional animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* Side Navigation styles - updated for hover functionality */
    .side-nav {
      width: 250px; /* Fixed width rather than vw */
      background-color: var(--sidebar-background);
      border-right: 1px solid var(--card-border);
      padding: 1.5rem 0;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2);
      transition: width 0.3s ease-out;
      z-index: 200;
    }
    
    .side-nav:hover {
      width: 350px; /* Definitely larger than non-hovered state */
      overflow-y: auto;
    }
    
    .side-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem 1rem;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 1rem;
    }
    
    .side-nav-header h3 {
      font-size: 1.3rem;
      color: var(--primary-color);
      margin: 0;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .close-sidebar {
      display: none;
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      transition: color 0.2s ease;
    }
    
    .close-sidebar:hover {
      color: var(--primary-color);
    }
    
    .project-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      color: var(--text-secondary);
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }
    
    .nav-item:hover, .nav-item:focus {
      background-color: rgba(94, 158, 255, 0.1);
      color: var(--text-primary);
    }
    
    .nav-item.active {
      background-color: rgba(94, 158, 255, 0.15);
      color: var(--primary-color);
      border-left: 3px solid var(--primary-color);
    }
    
    .nav-item-thumbnail {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 12px;
      border: 1px solid var(--card-border);
    }
    
    .nav-item-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .nav-item-title {
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px; /* Control width when not expanded */
      transition: max-width 0.3s ease-out;
    }
    
    .side-nav:hover .nav-item-title {
      max-width: 280px; /* Allow more space for text when hovered */
    }
    
    /* Sidebar toggle for mobile */
    .sidebar-toggle {
      display: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--card-background);
      border: 1px solid var(--card-border);
      cursor: pointer;
      z-index: 50;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger {
      position: relative;
      display: block;
      background-color: var(--primary-color);
      width: 20px;
      height: 2px;
      margin: 0 auto;
      transition: all 0.3s ease;
    }
    
    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      background-color: var(--primary-color);
      width: 20px;
      height: 2px;
      transition: all 0.3s ease;
    }
    
    .hamburger::before {
      top: -6px;
    }
    
    .hamburger::after {
      top: 6px;
    }
    
    /* High contrast mode adjustments */
    @media (forced-colors: active) {
      .project-card, .nav-item-thumbnail, .side-nav {
        border: 2px solid ButtonText;
      }
      
      .project-info::before, .nav-item.active {
        background: Highlight;
      }
      
      .expanded-header {
        border-bottom: 2px solid ButtonText;
      }
      
      .close-button {
        border: 2px solid ButtonText;
      }
    }
    
    /* Lightbox styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1500; /* Increased to ensure it's above everything */
        animation: fadeIn 0.3s ease forwards;
    }
    
    .lightbox-content {
        position: relative;
        width: 90%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.4s ease forwards;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: var(--primary-color);
        transform: scale(1.1);
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-nav:hover {
        background: rgba(94, 158, 255, 0.7);
    }
    
    .lightbox-prev {
        left: 20px;
    }
    
    .lightbox-next {
        right: 20px;
    }
    
    .lightbox-counter {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1rem;
        background: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
        border-radius: 15px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Mobile and responsive styles */
    @media (max-width: 768px) {
      /* Layout adjustments for mobile */
      .side-nav {
        transform: translateX(-100%);
        width: 85%;
        max-width: 300px;
        transition: transform 0.3s ease;
      }
      
      .side-nav.visible {
        transform: translateX(0);
      }
      
      .side-nav:hover {
        width: 85%; /* Keep consistent width on mobile */
      }
      
      /* Show the close button for sidebar on mobile */
      .close-sidebar {
        display: block;
      }
      
      /* Display the hamburger menu button */
      .sidebar-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 100;
      }
      
      /* Adjust content area to use full width */
      .content-area {
        margin-left: 0;
        padding: 1.5rem 1rem;
      }
      
      /* Header adjustments */
      header {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      h2 {
        font-size: 1.2rem;
      }
      
      /* Project view adjustments */
      .expanded-project {
        padding: 1.5rem 1rem;
        max-height: 80vh;
      }
      
      .expanded-header h3 {
        font-size: 1.5rem;
      }
      
      /* Gallery adjustments */
      .gallery {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .gallery.large-collection {
        grid-template-columns: 1fr;
      }
    }
    
    /* Overlay for when the mobile sidebar is open */
    .sidebar-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 150;
    }
    
    @media (max-width: 768px) {
      .sidebar-overlay.visible {
        display: block;
      }
    }
</style>

<!-- Add overlay element for mobile sidebar -->
<div class="sidebar-overlay" class:visible={isSidebarOpen} on:click={toggleSidebar}></div>