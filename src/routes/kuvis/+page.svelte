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
</script>

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
                    <button 
                      class="close-button" 
                      on:click={() => toggleProject(project.id)}
                      aria-label="Close project details"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div class="expanded-content">
                    <div class="description">
                      <p class="project-text">{project.description}</p>
                    </div>
                    <div class="gallery" role="group" aria-label="Project images">
                      {#each project.images as image, i}
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${i+1}`} 
                          class="gallery-image" 
                          style="animation-delay: {i * 0.1}s"
                        />
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
    
    /* Content area */
    .content-area {
      flex: 1;
      padding: 2rem;
      margin-left: 20vw; /* Match the sidebar width */
      transition: margin-left 0.3s ease;
    }
    
    /* Side Navigation styles - updated for hover functionality */
    .side-nav {
      width: 20vw;
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
      z-index: 90;
      transition: width 0.3s ease-out;
      z-index: 1000;
    }
    
    .side-nav:hover {
      width: 350px;
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
    
    /* Welcome message styles */
    .welcome-message {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50vh;
      font-size: 1.2rem;
      color: var(--text-secondary);
      text-align: center;
      animation: fadeInUp 0.8s ease-out forwards;
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
    
    /* Expanded project styles - updated for new layout */
    .expanded-project {
      position: relative;
      background: var(--background-color);
      padding: 1rem 0;
      overflow-y: auto;
      animation: scaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    
    @media (max-width: 768px) {
      main {
        flex-direction: column;
      }
      
      .content-area {
        margin-left: 0;
        padding-top: 4rem;
      }
      
      .side-nav {
        width: 280px;
        position: fixed;
        left: -280px;
        transition: transform 0.3s ease;
        z-index: 100;
      }
      
      .side-nav.visible {
        transform: translateX(280px);
      }
      
      .side-nav:hover {
        width: 280px; /* Keep the width consistent on mobile */
      }
      
      .sidebar-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    /* Preserve your original styles */
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
        transform: scale(0.9);
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
  
    header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInUp 0.8s ease-out forwards;
    }
  
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px rgba(94, 158, 255, 0.2);
    }
  
    h2 {
      font-size: 1.5rem;
      color: var(--text-secondary);
      font-weight: normal;
    }
  
    /* Expanded project styles */
    .expanded-project {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--background-color);
      z-index: 100;
      padding: 2rem;
      overflow-y: auto;
      animation: scaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    
    @media (min-width: 769px) {
      .expanded-project {
        left: 280px; /* Adjust based on sidebar width */
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      .expanded-project {
        left: 240px; /* Adjust based on smaller sidebar width */
      }
    }
  
    .expanded-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 3px solid var(--primary-color);
      padding-bottom: 1rem;
    }
  
    .expanded-header h3 {
      font-size: 2rem;
      margin: 0;
      color: var(--primary-color);
      animation: fadeInUp 0.5s ease forwards;
      outline: none;
    }
  
    .close-button {
      background: none;
      border: 2px solid var(--primary-color);
      font-size: 1.8rem;
      cursor: pointer;
      color: var(--primary-color);
      padding: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      transition: all 0.3s ease;
    }
  
    .close-button:hover,
    .close-button:focus-visible {
      background-color: var(--primary-color);
      color: var(--background-color);
      transform: rotate(90deg);
    }
  
    .close-button:focus-visible {
      outline: var(--focus-outline);
      outline-offset: 2px;
    }
  
    .expanded-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  
    .gallery-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
      animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-fill-mode: both;
      opacity: 0;
      border: 1px solid var(--card-border);
    }
  
    .gallery-image:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      border-color: var(--primary-color);
    }
  
    .description {
      line-height: 1.8;
      color: var(--text-primary);
      font-size: 1.1rem;
      padding: 1.5rem;
      background: var(--card-background);
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      animation: fadeInUp 0.6s ease forwards;
      animation-delay: 0.3s;
      opacity: 0;
      border: 1px solid var(--card-border);
    }
  
    .project-text {
      white-space: pre-line;
      margin: 0;
    }
  
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
        margin-top: 1rem;
      }
  
      .expanded-content {
        grid-template-columns: 1fr;
      }
  
      .expanded-header h3 {
        font-size: 1.5rem;
      }
  
      main {
        padding: 1rem;
        padding-top: 4rem;
      }
  
      .gallery {
        grid-template-columns: 1fr;
      }
      
      header {
        margin-top: 1rem;
      }
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
</style>