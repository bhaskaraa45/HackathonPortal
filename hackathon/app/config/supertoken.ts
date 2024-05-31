import ThirdParty, {
    Google,
    Github,
    Apple,
} from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import SuperTokensReact from 'supertokens-auth-react';

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
    apiDomain: 'http://localhost:8080',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/login',
};

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo,
        recipeList: [
            ThirdParty.init({
                style: `
                    [data-supertokens~=superTokensBranding] {
                        display: none;}`,
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

export async function getSessionStatus() {
    SuperTokensReact.init(frontendConfig())
    return await Session.doesSessionExist()
}