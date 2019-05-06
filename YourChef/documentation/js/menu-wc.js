'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">yourchef documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' : 'data-target="#xs-components-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' :
                                            'id="xs-components-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' : 'data-target="#xs-injectables-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' :
                                        'id="xs-injectables-links-module-AppModule-4875df28924d05cce3514f08a5fd85df"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EstadisticasService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EstadisticasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RecetasService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RecetasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CocinadasPageModule.html" data-type="entity-link">CocinadasPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CocinadasPageModule-4002a9f5b997b0f14456b9e76c6fad5e"' : 'data-target="#xs-components-links-module-CocinadasPageModule-4002a9f5b997b0f14456b9e76c6fad5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CocinadasPageModule-4002a9f5b997b0f14456b9e76c6fad5e"' :
                                            'id="xs-components-links-module-CocinadasPageModule-4002a9f5b997b0f14456b9e76c6fad5e"' }>
                                            <li class="link">
                                                <a href="components/CocinadasPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CocinadasPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InicioModule.html" data-type="entity-link">InicioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InicioModule-0d331e734cfe70c94fb7f12348476b47"' : 'data-target="#xs-components-links-module-InicioModule-0d331e734cfe70c94fb7f12348476b47"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InicioModule-0d331e734cfe70c94fb7f12348476b47"' :
                                            'id="xs-components-links-module-InicioModule-0d331e734cfe70c94fb7f12348476b47"' }>
                                            <li class="link">
                                                <a href="components/InicioPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' : 'data-target="#xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' :
                                            'id="xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilModule.html" data-type="entity-link">PerfilModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PerfilModule-28174c4c9ff0402a140fc3fc9cc367b8"' : 'data-target="#xs-components-links-module-PerfilModule-28174c4c9ff0402a140fc3fc9cc367b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PerfilModule-28174c4c9ff0402a140fc3fc9cc367b8"' :
                                            'id="xs-components-links-module-PerfilModule-28174c4c9ff0402a140fc3fc9cc367b8"' }>
                                            <li class="link">
                                                <a href="components/PerfilPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PerfilPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecetaPageModule.html" data-type="entity-link">RecetaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RecetaPageModule-89fd1b2e30a494b29220ffa08188b668"' : 'data-target="#xs-components-links-module-RecetaPageModule-89fd1b2e30a494b29220ffa08188b668"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecetaPageModule-89fd1b2e30a494b29220ffa08188b668"' :
                                            'id="xs-components-links-module-RecetaPageModule-89fd1b2e30a494b29220ffa08188b668"' }>
                                            <li class="link">
                                                <a href="components/RecetaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecetaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecetasModule.html" data-type="entity-link">RecetasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RecetasModule-7239a5e9345577d62f0a9b499409c7ec"' : 'data-target="#xs-components-links-module-RecetasModule-7239a5e9345577d62f0a9b499409c7ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecetasModule-7239a5e9345577d62f0a9b499409c7ec"' :
                                            'id="xs-components-links-module-RecetasModule-7239a5e9345577d62f0a9b499409c7ec"' }>
                                            <li class="link">
                                                <a href="components/RecetasPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecetasPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link">SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-843aa3a6a7d29b4e457547255ffb78d0"' : 'data-target="#xs-components-links-module-SettingsPageModule-843aa3a6a7d29b4e457547255ffb78d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-843aa3a6a7d29b4e457547255ffb78d0"' :
                                            'id="xs-components-links-module-SettingsPageModule-843aa3a6a7d29b4e457547255ffb78d0"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageModule.html" data-type="entity-link">SignupPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SignupPageModule-1bfa2f02e464a671b64acc1ec069f593"' : 'data-target="#xs-components-links-module-SignupPageModule-1bfa2f02e464a671b64acc1ec069f593"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignupPageModule-1bfa2f02e464a671b64acc1ec069f593"' :
                                            'id="xs-components-links-module-SignupPageModule-1bfa2f02e464a671b64acc1ec069f593"' }>
                                            <li class="link">
                                                <a href="components/SignupPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' : 'data-target="#xs-components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' :
                                            'id="xs-components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Cocinadas.html" data-type="entity-link">Cocinadas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FavRecipes.html" data-type="entity-link">FavRecipes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});