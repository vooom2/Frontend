interface NigerianState {
    name: string;
    capital: string;
    region: 'North Central' | 'North East' | 'North West' | 'South East' | 'South South' | 'South West';
    yearCreated: number;
}

const nigerianStates: NigerianState[] = [
    { name: "Abia", capital: "Umuahia", region: "South East", yearCreated: 1991 },
    { name: "Adamawa", capital: "Yola", region: "North East", yearCreated: 1991 },
    { name: "Akwa Ibom", capital: "Uyo", region: "South South", yearCreated: 1987 },
    { name: "Anambra", capital: "Awka", region: "South East", yearCreated: 1991 },
    { name: "Bauchi", capital: "Bauchi", region: "North East", yearCreated: 1976 },
    { name: "Bayelsa", capital: "Yenagoa", region: "South South", yearCreated: 1996 },
    { name: "Benue", capital: "Makurdi", region: "North Central", yearCreated: 1976 },
    { name: "Borno", capital: "Maiduguri", region: "North East", yearCreated: 1976 },
    { name: "Cross River", capital: "Calabar", region: "South South", yearCreated: 1967 },
    { name: "Delta", capital: "Asaba", region: "South South", yearCreated: 1991 },
    { name: "Ebonyi", capital: "Abakaliki", region: "South East", yearCreated: 1996 },
    { name: "Edo", capital: "Benin City", region: "South South", yearCreated: 1991 },
    { name: "Ekiti", capital: "Ado-Ekiti", region: "South West", yearCreated: 1996 },
    { name: "Enugu", capital: "Enugu", region: "South East", yearCreated: 1991 },
    { name: "Federal Capital Territory", capital: "Abuja", region: "North Central", yearCreated: 1976 },
    { name: "Gombe", capital: "Gombe", region: "North East", yearCreated: 1996 },
    { name: "Imo", capital: "Owerri", region: "South East", yearCreated: 1976 },
    { name: "Jigawa", capital: "Dutse", region: "North West", yearCreated: 1991 },
    { name: "Kaduna", capital: "Kaduna", region: "North West", yearCreated: 1967 },
    { name: "Kano", capital: "Kano", region: "North West", yearCreated: 1967 },
    { name: "Katsina", capital: "Katsina", region: "North West", yearCreated: 1987 },
    { name: "Kebbi", capital: "Birnin Kebbi", region: "North West", yearCreated: 1991 },
    { name: "Kogi", capital: "Lokoja", region: "North Central", yearCreated: 1991 },
    { name: "Kwara", capital: "Ilorin", region: "North Central", yearCreated: 1967 },
    { name: "Lagos", capital: "Ikeja", region: "South West", yearCreated: 1967 },
    { name: "Nasarawa", capital: "Lafia", region: "North Central", yearCreated: 1996 },
    { name: "Niger", capital: "Minna", region: "North Central", yearCreated: 1976 },
    { name: "Ogun", capital: "Abeokuta", region: "South West", yearCreated: 1976 },
    { name: "Ondo", capital: "Akure", region: "South West", yearCreated: 1976 },
    { name: "Osun", capital: "Osogbo", region: "South West", yearCreated: 1991 },
    { name: "Oyo", capital: "Ibadan", region: "South West", yearCreated: 1976 },
    { name: "Plateau", capital: "Jos", region: "North Central", yearCreated: 1976 },
    { name: "Rivers", capital: "Port Harcourt", region: "South South", yearCreated: 1967 },
    { name: "Sokoto", capital: "Sokoto", region: "North West", yearCreated: 1976 },
    { name: "Taraba", capital: "Jalingo", region: "North East", yearCreated: 1991 },
    { name: "Yobe", capital: "Damaturu", region: "North East", yearCreated: 1991 },
    { name: "Zamfara", capital: "Gusau", region: "North West", yearCreated: 1996 }
];

export default nigerianStates;