import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import SuperTokens from 'supertokens-node/lib/build/supertokens';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig } from './supertoken';

async function GoogleSignOut() {
    SuperTokensReact.init(frontendConfig())
    await signOut();
}

export default GoogleSignOut;