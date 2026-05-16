/* ==========================================================================
   TOKENS DE DESIGN E VARIÁVEIS
   ========================================================================== */
:root {
    --color-primary-dark: #225c51;
    --color-primary: #2c786c;
    --color-primary-light: #4a7c59;
    --color-primary-extralight: #e8f5e9;

    --color-success: #4caf50;
    --color-warning: #ff9800;
    --color-danger: #f44336;
    --color-info: #2196f3;
    --color-research: #673ab7; 

    --color-text-primary: #212121;
    --color-text-secondary: #5f6368;
    --color-text-light: #ffffff;
    --color-border: #e0e0e0;
    --color-disabled: #bdbdbd;
    --color-background-main: #f4f7f6;
    --color-background-container: #ffffff;
    --color-background-modal: rgba(0, 0, 0, 0.65);
    --color-background-mentor: #fffbeb;

    --font-family-body: 'Roboto', 'Segoe UI', Tahoma, sans-serif;
    --font-family-heading: 'Poppins', sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.6;

    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-large: 12px;
    --shadow-light: 0 2px 4px rgba(0,0,0,0.05);
    --shadow-medium: 0 4px 12px rgba(0,0,0,0.1);
    --shadow-heavy: 0 8px 24px rgba(0,0,0,0.15);
    --transition-speed: 0.2s ease-in-out;
    --transition-speed-fast: 0.1s ease-in-out;
}

/* ==========================================================================
   RESET E BASE
   ========================================================================== */
*, *::before, *::after { box-sizing: border-box; }

html { font-size: var(--font-size-base); }

body {
    font-family: var(--font-family-body);
    line-height: var(--line-height-base);
    color: var(--color-text-primary);
    background-color: var(--color-background-main);
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    color: var(--color-primary-dark);
    margin: 0 0 0.75em 0;
    line-height: 1.2;
}
h1 { font-size: 2.25rem; }
h2 { font-size: 1.75rem; color: var(--color-primary); }
h3 { font-size: 1.25rem; color: var(--color-primary-light); }
h4 { 
    font-size: 1.1rem; 
    color: var(--color-text-primary);
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 8px;
    margin-top: 24px;
    text-align: left;
}

p { margin: 0 0 1em 0; }
small { font-size: 0.85em; color: var(--color-text-secondary); }

/* ==========================================================================
   LAYOUT
   ========================================================================== */
.l-game-wrapper {
    background-color: var(--color-background-container);
    padding: 25px 30px;
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-medium);
    width: 100%;
    max-width: 1100px;
    position: relative;
    border-top: 5px solid var(--color-primary);
}

.l-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    text-align: left;
    margin-top: 20px;
}

.l-credits-footer {
    margin-top: 25px;
    text-align: center;
    font-size: 0.8em;
    color: var(--color-text-secondary);
    border-top: 1px solid var(--color-border);
    padding-top: 15px;
}

/* ==========================================================================
   BOTÕES
   ========================================================================== */
.c-btn {
    font-family: var(--font-family-body);
    font-weight: 700;
    font-size: 1rem;
    color: var(--color-text-light);
    background-color: var(--color-primary-light);
    border: none;
    padding: 12px 20px;
    margin: 5px;
    border-radius: var(--border-radius-medium);
    cursor: pointer;
    text-align: center;
    transition: all var(--transition-speed);
    display: inline-block;
}

.c-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.c-btn:active:not(:disabled) { transform: translateY(0); }

.c-btn:disabled {
    background-color: var(--color-disabled) !important;
    color: var(--color-text-secondary) !important;
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    box-shadow: none;
}

.c-btn--start { background-color: var(--color-success); }
.c-btn--next-month { background-color: var(--color-warning); color: var(--color-text-primary); }
.c-btn--decision { background-color: var(--color-info); }
.c-btn--research { background-color: var(--color-research); }
.c-btn--event { background-color: var(--color-primary-dark); }
.c-btn--profile { background-color: var(--color-primary-light); }
.c-btn--profile.is-selected {
    background-color: var(--color-primary-dark);
    transform: scale(1.03);
    box-shadow: var(--shadow-medium);
}

.c-btn--full-width { display: block; width: 100%; margin: 10px 0; }

.c-btn--action {
    display: block;
    width: 100%;
    margin: 8px 0;
    text-align: left;
    padding: 10px 15px;
    border-left: 4px solid transparent;
    transition: all var(--transition-speed-fast);
}

.c-btn--action:hover:not(:disabled) {
    background-color: var(--color-primary-extralight);
    color: var(--color-primary-dark);
    border-left: 4px solid var(--color-primary);
    transform: translateX(3px);
    box-shadow: none;
}

.c-btn--research:hover:not(:disabled) {
    background-color: #ede7f6;
    color: var(--color-research);
    border-left: 4px solid var(--color-research);
}

.c-btn--action small {
    display: block;
    font-weight: 400;
    opacity: 0.9;
    color: inherit;
    font-size: 0.85em;
}

.c-btn--action .cost { color: var(--color-warning); font-weight: 700; }
.c-btn--action .rp { color: #d1c4e9; font-weight: 700; }
.c-btn--action:hover:not(:disabled) .cost { color: var(--color-danger); }
.c-btn--action:hover:not(:disabled) .rp { color: var(--color-research); }

.c-btn--audio-toggle {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.5em;
    padding: 0;
    line-height: 1;
    border-radius: 50%;
    background-color: var(--color-primary-light);
    z-index: 10;
}

/* ==========================================================================
   GRID DE ESTATÍSTICAS E LOG
   ========================================================================== */
.c-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: var(--color-primary-extralight);
    border-radius: var(--border-radius-medium);
}

.c-stats-grid__item {
    padding: 12px;
    background-color: var(--color-background-container);
    border-radius: var(--border-radius-small);
    font-size: 0.95em;
    border: 1px solid var(--color-border);
    text-align: left;
    box-shadow: var(--shadow-light);
    transition: all var(--transition-speed);
}

.c-stats-grid__item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
}

.c-stats-grid__label { display: block; font-size: 0.85em; color: var(--color-text-secondary); margin-bottom: 4px; }
.c-stats-grid__value { font-weight: 700; color: var(--color-primary-dark); font-size: 1.25em; }

.c-stats-grid__value--budget { color: var(--color-success); }
.c-stats-grid__value--waste { color: var(--color-danger); }
.c-stats-grid__value--morale { color: var(--color-info); }
.c-stats-grid__value--reputation { color: var(--color-primary-light); }
.c-stats-grid__value--marketPriceModifier.is-good { color: var(--color-success); }
.c-stats-grid__value--marketPriceModifier.is-bad { color: var(--color-danger); }

.c-game-log {
    margin-top: 20px;
    padding: 15px;
    background-color: #fdfdfd;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-medium);
    text-align: left;
    height: 200px;
    overflow-y: auto;
    font-size: 0.9em;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.c-game-log__entry {
    margin: 0 0 8px 0;
    padding: 8px;
    border-bottom: 1px dashed var(--color-border);
}
.c-game-log__entry:first-child { animation: fadeIn 0.5s ease; }
.c-game-log__entry:last-child { border-bottom: none; }

.c-game-log__entry--good { color: var(--color-success); }
.c-game-log__entry--bad { color: var(--color-danger); }
.c-game-log__entry--neutral { color: var(--color-info); }
.c-game-log__entry--sabia { 
    font-style: italic; 
    color: var(--color-primary-dark);
    background-color: var(--color-primary-extralight);
    border-radius: var(--border-radius-small);
}
.c-game-log__entry--sabia strong { color: var(--color-primary); }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ==========================================================================
   FORMULÁRIOS E MODAIS
   ========================================================================== */
.c-form-group { margin-bottom: 20px; text-align: left; }
.c-form-group label { display: block; margin-bottom: 8px; font-weight: 700; color: var(--color-primary-light); font-size: 1.1em; }
.c-form-group input[type="text"] {
    padding: 12px; width: 100%; border: 1px solid var(--color-border);
    border-radius: var(--border-radius-medium); font-size: 1rem;
    transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
}
.c-form-group input[type="text"]:focus {
    outline: none; border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-extralight);
}

.c-modal {
    display: none; position: fixed; z-index: 1000; left: 0; top: 0;
    width: 100%; height: 100%; overflow: auto;
    background-color: var(--color-background-modal);
    animation: fadeIn 0.3s;
}

.c-modal__content {
    background-color: var(--color-background-container);
    margin: 10% auto; padding: 30px; border: 1px solid var(--color-border);
    width: 90%; max-width: 700px; border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-heavy); position: relative;
    animation: slideIn 0.4s;
}

.c-modal__close-btn {
    color: var(--color-text-secondary); float: right; font-size: 28px;
    font-weight: bold; cursor: pointer; transition: color var(--transition-speed);
}
.c-modal__close-btn:hover { color: var(--color-text-primary); text-decoration: none; }

.c-modal__content--sabia { border-top: 5px solid var(--color-warning); }
.c-modal__content--sabia h2 { color: var(--color-warning); }
.c-modal__content--event { border-top: 5px solid var(--color-danger); }
.c-modal__content--event h2 { color: var(--color-danger); }

@keyframes slideIn {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ==========================================================================
   GRÁFICOS E PROFESSOR SABIÁ
   ========================================================================== */
.c-chart-container {
    display: flex; justify-content: space-around; align-items: flex-end;
    height: 250px; border-bottom: 2px solid var(--color-text-primary);
    padding: 10px; box-sizing: border-box; margin-top: 20px;
}
.c-chart-bar-wrapper {
    height: 100%; display: flex; flex-direction: column;
    justify-content: flex-end; align-items: center; margin: 0 5px;
    flex-grow: 1; text-align: center;
}
.c-chart-bar {
    width: 100%; max-width: 40px; text-align: center; color: var(--color-text-light);
    font-size: 0.9em; position: relative; transition: height 0.5s ease-out;
    display: flex; justify-content: center; align-items: flex-end;
    padding-bottom: 5px; box-sizing: border-box;
    border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
}
.c-chart-bar__value { font-weight: bold; background: rgba(0,0,0,0.2); padding: 1px 3px; border-radius: var(--border-radius-small); }
.c-chart-bar__label { margin-top: 8px; color: var(--color-text-primary); font-size: 0.85em; font-weight: 700; }
.c-chart-bar--budget { background-color: var(--color-success); }
.c-chart-bar--sustainability { background-color: var(--color-primary); }
.c-chart-bar--waste { background-color: var(--color-danger); }

.c-sabia-mentor {
    padding: 15px; margin-top: 20px; background-color: var(--color-background-mentor);
    border: 1px solid var(--color-warning); border-radius: var(--border-radius-medium);
    text-align: left; display: flex; align-items: center; gap: 15px; box-shadow: var(--shadow-light);
}
.c-sabia-mentor__icon { font-size: 2.5em; flex-shrink: 0; }
.c-sabia-mentor__content h4 { margin: 0 0 5px 0; color: var(--color-warning); border-bottom: none; font-size: 1.1em; }
.c-sabia-mentor__content p { margin: 0; font-size: 0.95em; color: var(--color-text-secondary); }

/* ==========================================================================
   RESPONSIVIDADE E UTILITÁRIOS
   ========================================================================== */
@media (max-width: 768px) {
    body { padding: 10px; }
    .l-game-wrapper { padding: 15px; }
    h1 { font-size: 1.8rem; } h2 { font-size: 1.5rem; }
    .l-columns { grid-template-columns: 1fr; }
    .c-stats-grid { grid-template-columns: 1fr 1fr; }
    .c-modal__content { width: 95%; margin: 15% auto; padding: 20px; }
    .c-sabia-mentor { flex-direction: column; text-align: center; }
}
@media (max-width: 480px) {
    .c-stats-grid { grid-template-columns: 1fr; }
    .c-chart-bar__value, .c-chart-bar__label { font-size: 0.7em; }
}

.u-hidden { display: none !important; }
.u-text-danger { color: var(--color-danger); }
.u-text-success { color: var(--color-success); }
.u-text-center { text-align: center; }
