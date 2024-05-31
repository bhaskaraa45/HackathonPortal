package config

import (
	"os"

	"github.com/supertokens/supertokens-golang/recipe/dashboard"
	"github.com/supertokens/supertokens-golang/recipe/dashboard/dashboardmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func InitSuperTokesn() {
	apiBasePath := "/auth"
	websiteBasePath := "/login"
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "http://localhost:8888",
			// APIKey:        "",
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "hackathon",
			APIDomain:       os.Getenv("BACKEND_URL"),
			WebsiteDomain:   os.Getenv("FRONTEND_URL"),
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			dashboard.Init(&dashboardmodels.TypeInput{
				Admins: &[]string{
					os.Getenv("ADMIN_1"),
				},
			}),
			// dashboard.Init(nil),
			thirdparty.Init(&tpmodels.TypeInput{
				SignInAndUpFeature: tpmodels.TypeInputSignInAndUp{
					Providers: []tpmodels.ProviderInput{
						// We have provided you with development keys which you can use for testing.
						// IMPORTANT: Please replace them with your own OAuth keys for production use.
						{
							Config: tpmodels.ProviderConfig{
								ThirdPartyId: "google",
								Clients: []tpmodels.ProviderClientConfig{
									{
										ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
										ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
									},
								},
							},
						},
					},
				},
			}),
			session.Init(nil), // initializes session features
		},
	})

	if err != nil {
		panic(err.Error())
	}
}
