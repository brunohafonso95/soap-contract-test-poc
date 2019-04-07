const holidaysAvailableModel = joi.object().keys({
    GetHolidaysAvailableResult: joi.object().keys({
        HolidayCode: joi.array().items(joi.object().keys({
            Code: joi.string(),
            Description: joi.string()
        }))
    })
});

const holidaysForMonthModel = joi.object().keys({
    GetHolidaysForMonthResult: joi.object().keys({
        Holiday: joi.array().items(joi.object().keys({
            Country: joi.string(),
            HolidayCode: joi.string(),
            Descriptor: joi.string(),
            HolidayType: joi.string(),
            DateType: joi.string(),
            BankHoliday: joi.string(),
            Date: joi.date(),
            RelatedHolidayCode: joi.string()
        }))
    })
});

const holidaysForYearModel = joi.object().keys({
    GetHolidaysForYearResult: joi.object().keys({
        Holiday: joi.array().items(joi.object().keys({
            Country: joi.string(),
            HolidayCode: joi.string(),
            Descriptor: joi.string(),
            HolidayType: joi.string(),
            DateType: joi.string(),
            BankHoliday: joi.string(),
            Date: joi.date(),
            RelatedHolidayCode: joi.string()
        }))
    })
});

const HolidaysForDateRangeModel = joi.object().keys({
    GetHolidaysForDateRangeResult: joi.object().keys({
        Holiday: joi.array().items(joi.object().keys({
            Country: joi.string(),
            HolidayCode: joi.string(),
            Descriptor: joi.string(),
            HolidayType: joi.string(),
            DateType: joi.string(),
            BankHoliday: joi.string(),
            Date: joi.date(),
            RelatedHolidayCode: joi.string(),
            ApplicableRegions: joi.object().keys({
                RegionCode: joi.array().items(joi.object().keys({
                    Code: joi.string(),
                    Description: joi.string()
                }))
            })
        }))
    })
});

const holidayDateResultModel = joi.object().keys({
    GetHolidayDateResult: joi.date()
});

module.exports = {
    holidaysAvailableModel,
    holidaysForMonthModel,
    holidaysForYearModel,
    HolidaysForDateRangeModel,
    holidayDateResultModel
};