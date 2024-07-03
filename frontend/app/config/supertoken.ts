import ThirdParty, {
    Google,
    Github,
    Apple,
} from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import { getUserStatus } from '../api/auth';

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
    {};

export function setRouter(
    router: ReturnType<typeof useRouter>,
    pathName: string,
) {
    routerInfo.router = router;
    routerInfo.pathName = pathName;
}

const appInfo = {
    appName: 'Hackathon E-Cell',
    apiDomain: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080',
    websiteDomain: process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'http://localhost:8080',
    apiBasePath: '/auth',
    websiteBasePath: '/login',
};

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo,
        getRedirectionURL: async (context) => {
            if (context.action === "SUCCESS" && context.newSessionCreated) {
                if (context.redirectToPath !== undefined) {
                    return context.redirectToPath;
                }

                const status = await getUserStatus();
                if (status === 0) {
                    return "/register";
                } else if (status === 1) {
                    return "/admin";
                } else {
                    return "/dashboard";
                }
            }
            return undefined;
        },
        recipeList: [
            ThirdParty.init({
                style: `
                    [data-supertokens~=superTokensBranding] {
                        display: none;
                    }

                    [data-supertokens~=headerTitle] {
                        text-indent: -9999px;
                        line-height: 0;
                    }

                    [data-supertokens~=divider] {
                        display: none;
                    }

                    [data-supertokens~=button] {
                        background-color: #06081A;
                        height: 48px;
                        border-color: #262C64;
                    }

                    [data-supertokens~=button]:hover {
                        background-color: #F3F3F3;
                        text-color: #06081A;
                    }

                    [data-supertokens~=button]:hover [data-supertokens~=providerButtonText] {
                        color: #06081A;
                    }

                    [data-supertokens~=providerButtonText] {
                        color: #FFFFFF;
                        font-size: 1rem;
                        font-weight: 500;
                    }

                    [data-supertokens~=providerButtonLeft] {
                        margin-left: 44px;
                    }

                    [data-supertokens~=providerButtonLogoCenter] svg {
                        width: 26px;
                        height: 26px;
                    }

                    [data-supertokens~=headerTitle]:after {
                        height: 32px;
                        visibility: visible;
                        content: "Sign in to continue";
                        justify-content: center;
                        text-indent: 0;
                        display: block;
                        line-height: initial;
                        font-size: 1.3rem;
                        font-weight:500;
                    }

                    [data-supertokens~=container] {
                        --palette-background: 11, 14, 41;
                        --palette-inputBackground: 41, 41, 41;
                        --palette-inputBorder: 41, 41, 41;
                        --palette-textTitle: 255, 255, 255;
                        --palette-textLabel: 255, 255, 255;
                        --palette-textPrimary: 255, 255, 255;
                        --palette-error: 173, 46, 46;
                        --palette-textInput: 169, 169, 169;
                        --palette-textLink: 169, 169, 169;
                    }

                `,
                signInAndUpFeature: {
                    providers: [
                        Google.init(),
                        // Github.init(),
                        // Apple.init(),
                    ],
                    termsOfServiceLink:"",
                    privacyPolicyLink:""
                },
                useShadowDom: false,
            }),
            Session.init(),
        ],
        windowHandler: (orig) => {
            return {
                ...orig,
                location: {
                    ...orig.location,
                    getPathName: () => routerInfo.pathName!,
                    assign: (url) => routerInfo.router!.push(url.toString()),
                    setHref: (url) => routerInfo.router!.push(url.toString()),
                },
            };
        },
    };
};
