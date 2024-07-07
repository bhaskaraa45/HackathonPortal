package utils

import (
	"time"
)

var (
	Round1Start = time.Date(2024, 7, 15, 00, 00, 0, 0, time.Local)
	round1End   = time.Date(2024, 7, 20, 23, 59, 59, 0, time.Local)

	Round2Start = time.Date(2024, 7, 25, 00, 00, 0, 0, time.Local)
	round2End   = time.Date(2024, 7, 30, 00, 59, 59, 0, time.Local)

	Round3Start = time.Date(2024, 8, 2, 00, 00, 0, 0, time.Local)
	round3End   = time.Date(2024, 8, 2, 23, 59, 59, 0, time.Local)
)

func WhatIsCurrentRound() (int, bool) {
	now := time.Now()

	switch {
	case now.After(Round1Start) && now.Before(round1End):
		return 1, true
	case now.After(Round2Start) && now.Before(round2End):
		return 2, true
	case now.After(Round3Start) && now.Before(round3End):
		return 3, true
	case now.After(Round1Start) && now.Before(Round2Start):
		return 1, false
	case now.After(Round2Start) && now.Before(Round3Start):
		return 2, false
	case now.After(round3End):
		return 3, false
	default:
		return 0, false
	}
}

func GetTimeline() map[string]map[string]time.Time {
	return map[string]map[string]time.Time{
		"round1": {
			"start": Round1Start,
			"end":   round1End,
		},
		"round2": {
			"start": Round2Start,
			"end":   round2End,
		},
		"round3": {
			"start": Round3Start,
			"end":   round3End,
		},
	}
}
