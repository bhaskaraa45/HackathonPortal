package utils

import "regexp"

func VerifyIITHEmail(email string) bool {
	return true
	regexPattern := `^[a-z]{2}(21|22|23)btech1\d{4}@iith\.ac\.in$`

	regex := regexp.MustCompile(regexPattern)

	return regex.MatchString(email)
}
