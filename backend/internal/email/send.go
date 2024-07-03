package email

// import (
// 	"encoding/json"
// 	"fmt"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// )

// // var (
// // 	smtpHost     = "smtp.gmail.com"
// // 	smtpPort     = "587"
// // 	smtpUser     = "ecell@iith.ac.in"
// // 	smtpPassword = "hdnvcogwdrotfcgr"
// // )

// type dataModel struct {
// 	To          string   `json:"to"`
// 	CC          []string `json:"cc"`
// 	TeamName    string   `json:"team_name"`
// 	MemberNames []string `json:"member_names"`
// }


// func SendEmail(c *gin.Context) {

// 	var dataModel dataModel
// 	err := json.NewDecoder(c.Request.Body).Decode(&dataModel)
// 	if err != nil {
// 		fmt.Println(err)
// 		resp := map[string]interface{}{
// 			"message":     "invalid json data",
// 			"status_code": http.StatusBadRequest,
// 		}
// 		c.JSON(http.StatusBadRequest, resp)
// 		return
// 	}

// 	from := smtpUser
// 	subject := "Subject: OTP Verification\r\n"
// 	body := fmt.Sprintf("Congratulations! Your Team is Registered for the E-Cell IIT Hyderabad & NPCI Hackathon")

// }
