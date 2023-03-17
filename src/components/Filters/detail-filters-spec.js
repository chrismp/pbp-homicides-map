// coverage: []
// crimeDate: {iso: "2018-12-24T23:30:00+00:00", formatted: "Dec. 24, 2018"}
// crimeLocationLatitude: "43.069610"
// crimeLocationLongitude: "-87.926760"
// crimeSceneAddress: "2800 block of N. 12th St."
// geojson: {geometry: {…}, type: "Feature", properties: {…}}
// homicideAction: "shot"
// id: 540
// isUCRReportable: true
// publicDisplay: true
// suspects: []
// victim:
// ageAtDeath: {raw: 23, formatted: "23 years"}
// bio: ""
// birthDate: {iso: "1995-05-09T00:00:00-05:00", formatted: "May 9, 1995"}
// fullName: "Lionel Kohlheim Jr."
// gender: "male"
// id: 541
// lastName: "Kohlheim Jr."
// popupOverride: ""
// race: "black"
// wasArrestMade: null
// wereChargesFiled: null

function isBetween(x0, x1) {
    return x => (x >= x0 && x <= x1);
}

const ageFilter = {
    key: 'age',
    label: 'Age',
    choices: [
        {
            label: '0 to 9',
            filter: ({victim}) => isBetween(0, 9)(victim.ageAtDeath.raw),
        },
        {
            label: '10 to 17',
            filter: ({victim}) => isBetween(10, 17)(victim.ageAtDeath.raw),
        },
        {
            label: '18 to 29',
            filter: ({victim}) => isBetween(18, 29)(victim.ageAtDeath.raw),
        },
        {
            label: '30 to 39',
            filter: ({victim}) => isBetween(30, 39)(victim.ageAtDeath.raw),
        },
        {
            label: '40 to 49',
            filter: ({victim}) => isBetween(40, 49)(victim.ageAtDeath.raw),
        },
        {
            label: '50+',
            filter: ({victim}) => 50 <= victim.ageAtDeath.raw,
        },
        {
            label: 'Unknown',
            filter: ({victim}) => victim.ageAtDeath.raw === 'unknown',
        },        
    ],
};

const causeFilter = {
    key: 'cause',
    label: 'Cause of death',
    choices: [
        // {
        //     label: 'Abuse',
        //     filter: ({homicideAction}) => homicideAction === 'abuse',
        // },
        // {
        //     label: 'Arson',
        //     filter: ({homicideAction}) => homicideAction === 'arson',
        // },
        {
            label: 'Beaten',
            filter: ({homicideAction}) => ['trauma','beaten'].some(substr => homicideAction.includes(substr)),
        },
        {
            label: 'Shot',
            filter: ({homicideAction}) => homicideAction === 'shot',
        },
        {
            label: 'Stabbed',
            filter: ({homicideAction}) => homicideAction === 'stabbed',
        },
        {
            label: 'Other',
            filter: ({homicideAction}) => homicideAction === 'other' | ['shot', 'stabbed', 'beaten', 'trauma', 'unknown'].every(substr => !homicideAction.includes(substr))
        },
        {
            label: 'Unknown',
            filter: ({homicideAction}) => homicideAction.includes('unknown')
        }     
    ],
};

const raceFilter = {
    key: 'race',
    label: 'Race',
    choices: [
        {
            label: 'Asian',
            filter: ({victim}) => victim.race === 'asian',
        },
        {
            label: 'Black',
            filter: ({victim}) =>  victim.race === 'black',
        },
        {
            label: 'Hispanic',
            filter: ({victim}) =>  victim.race === 'hispanic',
        },
        {
            label: 'White',
            filter: ({victim}) =>  victim.race === 'white',
        },
        {
            label: 'Other',
            filter: ({victim}) =>  ['black', 'white', 'hispanic', 'asian', 'unknown'].indexOf(victim.race) < 0 | victim.race === 'other',
        },
        {
            label: 'Unknown',
            filter: ({victim}) => victim.race === 'unknown',
        },
    ],
};

const genderFilter = {
    key: 'gender',
    label: 'Gender',
    choices: [
        {
            label: 'Male',
            filter: ({victim}) => victim.gender === 'male',
        },
        {
            label: 'Female',
            filter: ({victim}) => victim.gender === 'female',
        },
        {
            label: 'Unknown',
            filter: ({victim}) => victim.gender === 'unknown',
        },        
    ],
};

// const chargesFilter = {
//     key: 'charges',
//     label: 'Charges filed',
//     choices: [
//         {
//             label: 'Yes',
//             filter: ({wereChargesFiled}) => wereChargesFiled,
//         },
//         {
//             label: 'No',
//             filter: ({wereChargesFiled}) => !wereChargesFiled,
//         },
//     ],
// };

const filters = [
    ageFilter,
    causeFilter,
    raceFilter,
    genderFilter,
    // chargesFilter,
];

filters.forEach((filter, i) => {
    filter.id = i;
    filter.choices.forEach((choice, j) => {
        choice.id = j;
    });
});

const spec = { filters };

export default spec;
