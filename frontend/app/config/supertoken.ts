import ThirdParty, {
    Google,
    Github,
    Apple,
} from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';

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
                if (context.createdNewUser) {
                    '/'
                } else {
                    '/'
                }
                return "/";
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
                        visibility: hidden;
                    }
                    [data-supertokens~=headerTitle]:after {
                        visibility: visible;
                        content: "Sign In To Continue";
                        display:flex;
                        justify-content:center;
                    }
                    `,
                signInAndUpFeature: {
                    providers: [
                        Google.init(),
                        // Github.init(),
                        // Apple.init(),
                    ],
                },
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
}
