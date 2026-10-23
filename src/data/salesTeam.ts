// SharonPly sales team, from the client's sales team mapping sheet: each person with the
// cities they cover (Plywood) or the dedicated Decorative Veneer contact. Seeds the
// `sales_team` table on first run; /contact/sales-team reads the table and falls back
// to this list only when the database is unavailable.
export interface SalesPerson {
  name: string;
  designation: string;
  phone: string;
  email: string;
  division: "Plywood" | "Veneer";
  territory: string;
  cities: string[];
}

export const SALES_TEAM: SalesPerson[] = [
  { name: "Karunanidhi R.", designation: "Manager", phone: "+91 94449 54801", email: "rk@sharonply.com", division: "Plywood", territory: "Chennai Outer",
    cities: ["Arakkonam", "Tiruvallur", "Tiruttani", "Ponneri", "Gummidipoondi", "Madhavaram", "Chennai - Choolai", "Chennai - Parrys"] },
  { name: "David Ebenezer C.", designation: "Asst. Manager", phone: "+91 90433 00330", email: "david@sharonply.com", division: "Plywood", territory: "Chennai Outer",
    cities: ["Arakkonam", "Tiruvallur", "Tiruttani", "Ponneri", "Gummidipoondi", "Madhavaram", "Chennai - Choolai", "Chennai - Parrys"] },
  { name: "Rajesh S.", designation: "Manager", phone: "+91 99625 86664", email: "s.rajesh@sharonply.com", division: "Plywood", territory: "Chennai 1",
    cities: ["Chennai - Avadi", "Chennai - Thiruninravur", "Chennai - Ambattur", "Chennai - Villivakkam", "Chennai - Triplicane", "Chennai - Kolathur"] },
  { name: "Manickam T.", designation: "Manager", phone: "+91 93300 26657", email: "t.manickam@sharonply.com", division: "Plywood", territory: "Chennai 2",
    cities: ["Chennai - Sriperumbudur", "Chennai - Kundrathur", "Chennai - Poonamallee", "Chennai - Porur", "Chennai - Valasaravakkam", "Chennai - Vadapalani", "Chennai - Kodambakkam", "Chennai - Gemini", "Chennai - Mogappair"] },
  { name: "Uthaman S.", designation: "Manager", phone: "+91 78239 64060", email: "s.uthaman@sharonply.com", division: "Plywood", territory: "Chennai 3",
    cities: ["Chennai - Alwarpet", "Chennai - Adyar", "Chennai - Thiruvanmaiyur", "Chennai - Velachery", "Chennai - Keelkattalai", "Chennai - Tambaram", "Chennai - Perungalathur", "Guduvancherry", "Chengalpattu", "Mahabalipuram", "Tiruporur", "Chennai - Kelambakkam", "Chennai - Injambakkam", "Chennai - Medavakkam", "Chennai - Madipakkam", "Chennai - Rajkeelpakkam", "Chennai - Saidapet", "Chennai - Pallavaram"] },
  { name: "Periasamy T.", designation: "Sr. Manager", phone: "+91 78239 93482", email: "t.periasamy@sharonply.com", division: "Plywood", territory: "Coimbatore",
    cities: ["Coimbatore", "Pollachi", "Mettupalayam", "Erode", "Bhavani", "Gobichettipalayam", "Sathyamangalam", "Tiruppur", "Avinashi", "Palladam", "Dharapuram", "Udumalaipettai", "Tiruchengode", "Udhagamandalam (Ooty)", "Coonoor", "Gudalur", "Kotagiri"] },
  { name: "Sundarprabhu A.", designation: "Asst. Manager", phone: "+91 93848 07292", email: "sundarprabhu@sharonply.com", division: "Plywood", territory: "Coimbatore",
    cities: ["Coimbatore", "Pollachi", "Mettupalayam", "Erode", "Bhavani", "Gobichettipalayam", "Sathyamangalam", "Tiruppur", "Avinashi", "Palladam", "Dharapuram", "Udumalaipettai", "Tiruchengode", "Udhagamandalam (Ooty)", "Coonoor", "Gudalur", "Kotagiri"] },
  { name: "Darunkumar A.", designation: "Asst. Manager", phone: "+91 73053 72896", email: "darunkumar@sharonply.com", division: "Plywood", territory: "Coimbatore",
    cities: ["Coimbatore", "Pollachi", "Mettupalayam", "Erode", "Bhavani", "Gobichettipalayam", "Sathyamangalam", "Tiruppur", "Avinashi", "Palladam", "Dharapuram", "Udumalaipettai", "Tiruchengode", "Udhagamandalam (Ooty)", "Coonoor", "Gudalur", "Kotagiri"] },
  { name: "Jeevanantham M.", designation: "Sr. Executive", phone: "+91 94449 14800", email: "m.jeeva@sharonply.com", division: "Plywood", territory: "Coimbatore",
    cities: ["Coimbatore", "Pollachi", "Mettupalayam", "Erode", "Bhavani", "Gobichettipalayam", "Sathyamangalam", "Tiruppur", "Avinashi", "Palladam", "Dharapuram", "Udumalaipettai", "Tiruchengode", "Udhagamandalam (Ooty)", "Coonoor", "Gudalur", "Kotagiri"] },
  { name: "Anand J.", designation: "Asst. General Manager", phone: "+91 94449 14801", email: "j.anand@sharonply.com", division: "Plywood", territory: "Kumbakonam / Trichy",
    cities: ["Kumbakonam", "Tiruvarur", "Mannargudi", "Thiruthuraipoondi", "Nagapattinam", "Velankanni", "Vedaranyam", "Mayiladuthurai", "Sirkazhi", "Karaikkal", "Karaikudi", "Perambalur", "Karur", "Aranthangi", "Pudukkottai", "Pattukkottai", "Ariyalur", "Jayankondam", "Tiruchirappalli", "Thanjavur"] },
  { name: "Karthi R.", designation: "Asst. Manager", phone: "+91 78239 83474", email: "r.karthi@sharonply.com", division: "Plywood", territory: "Kumbakonam",
    cities: ["Kumbakonam", "Tiruvarur", "Mannargudi", "Thiruthuraipoondi", "Nagapattinam", "Velankanni", "Vedaranyam", "Mayiladuthurai", "Sirkazhi", "Karaikkal"] },
  { name: "Prakash T.", designation: "Sr. Executive", phone: "+91 62908 25170", email: "t.prakash@sharonply.com", division: "Plywood", territory: "Trichy",
    cities: ["Karaikudi", "Perambalur", "Karur", "Aranthangi", "Pudukkottai", "Pattukkottai", "Ariyalur", "Jayankondam", "Tiruchirappalli", "Thanjavur"] },
  { name: "Arun Kumar B.", designation: "Executive", phone: "+91 98844 55250", email: "b.arunkumar@sharonply.com", division: "Plywood", territory: "Trichy",
    cities: ["Karaikudi", "Perambalur", "Karur", "Aranthangi", "Pudukkottai", "Pattukkottai", "Ariyalur", "Jayankondam", "Tiruchirappalli", "Thanjavur"] },
  { name: "Prabu V.", designation: "Asst. General Manager", phone: "+91 94449 14802", email: "v.prabu@sharonply.com", division: "Plywood", territory: "Madurai",
    cities: ["Dindigul", "Palani", "Kodaikanal", "Oddanchatram", "Madurai", "Usilampatti", "Ramanathapuram", "Rameswaram", "Paramakudi", "Keelakarai", "Sivaganga", "Devakottai", "Manamadurai", "Theni", "Cumbam", "BODI", "Periyakulam", "Virudhunagar"] },
  { name: "Sakthivel T.", designation: "Asst. Manager", phone: "+91 99625 25789", email: "t.sakthivel@sharonply.com", division: "Plywood", territory: "Madurai",
    cities: ["Dindigul", "Palani", "Kodaikanal", "Oddanchatram", "Madurai", "Usilampatti", "Ramanathapuram", "Rameswaram", "Paramakudi", "Keelakarai", "Sivaganga", "Devakottai", "Manamadurai", "Theni", "Cumbam", "BODI", "Periyakulam", "Virudhunagar"] },
  { name: "Sebastian Daniel A.", designation: "Executive", phone: "+91 89252 76622", email: "a.sebastian@sharonply.com", division: "Plywood", territory: "Madurai",
    cities: ["Dindigul", "Palani", "Kodaikanal", "Oddanchatram", "Madurai", "Usilampatti", "Ramanathapuram", "Rameswaram", "Paramakudi", "Keelakarai", "Sivaganga", "Devakottai", "Manamadurai", "Theni", "Cumbam", "BODI", "Periyakulam", "Virudhunagar"] },
  { name: "Jai Godman T.", designation: "Manager", phone: "+91 94449 09301", email: "t.jai@sharonply.com", division: "Plywood", territory: "Tirunelveli",
    cities: ["Nagercoil", "Kanyakumari", "Marthandam", "Tenkasi", "Sankarankovil", "Shenkottai", "Thoothukudi", "Kovilpatti", "Tiruchendur", "Tirunelveli", "Ambasamudram", "Nanguneri", "Sivakasi", "Rajapalayam", "Srivilliputhur", "Aruppukottai"] },
  { name: "Ramesh Vikram V.", designation: "Sr. Executive", phone: "+91 72002 40844", email: "rameshvikram@sharonply.com", division: "Plywood", territory: "Tirunelveli",
    cities: ["Nagercoil", "Kanyakumari", "Marthandam", "Tenkasi", "Sankarankovil", "Shenkottai", "Thoothukudi", "Kovilpatti", "Tiruchendur", "Tirunelveli", "Ambasamudram", "Nanguneri", "Sivakasi", "Rajapalayam", "Srivilliputhur", "Aruppukottai"] },
  { name: "Manikandan J.", designation: "Sr. Manager", phone: "+91 91766 63728", email: "j.manikandan@sharonply.com", division: "Plywood", territory: "Pondicherry",
    cities: ["Viluppuram", "Tindivanam", "Gingee", "Cuddalore", "Chidambaram", "Panruti", "Neyveli", "Virudhachalam", "Pondicherry", "Ulundurpet", "Tirukoilur", "Madurantakam"] },
  { name: "Dhinesh S.", designation: "Asst. Manager", phone: "+91 89258 33253", email: "s.dhinesh@sharonply.com", division: "Plywood", territory: "Pondicherry",
    cities: ["Viluppuram", "Tindivanam", "Gingee", "Cuddalore", "Chidambaram", "Panruti", "Neyveli", "Virudhachalam", "Pondicherry", "Ulundurpet", "Tirukoilur", "Madurantakam"] },
  { name: "Iyandurai M.", designation: "Manager", phone: "+91 78239 98741", email: "m.iyandurai@sharonply.com", division: "Plywood", territory: "Salem",
    cities: ["Dharmapuri", "Pennagaram", "Kallakurichi", "Krishnagiri", "Bargur", "Hosur", "Namakkal", "Rasipuram", "Salem", "Mettur", "Attur"] },
  { name: "Manikandan C.", designation: "Sr. Executive", phone: "+91 94449 14803", email: "c.manikandan@sharonply.com", division: "Plywood", territory: "Salem",
    cities: ["Dharmapuri", "Pennagaram", "Kallakurichi", "Krishnagiri", "Bargur", "Hosur", "Namakkal", "Rasipuram", "Salem", "Mettur", "Attur"] },
  { name: "Koteeswaran S.", designation: "Manager", phone: "+91 94449 91392", email: "s.kotteeswaran@sharonply.com", division: "Plywood", territory: "Vellore",
    cities: ["Kancheepuram", "Ranipet", "Arcot", "Walajapet", "Sholinghur", "Tirupathur", "Ambur", "Vaniyambadi", "Tiruvannamalai", "Arani", "Cheyyar", "Vandavasi", "Polur", "Vellore", "Gudiyatham"] },
  { name: "Ananthakumar T.", designation: "Manager – Decorative Veneer", phone: "+91 78239 70671", email: "t.ananthakumar@sharonply.com", division: "Veneer", territory: "Veneer",
    cities: ["Tamil Nadu"] },
];
