-- SharonPly sales team: 24 members (23 Plywood with their cities, 1 Decorative Veneer)
--
-- For a database that already has the website's tables and dealers.
-- Run once in phpMyAdmin (select the database → Import, or paste into the SQL tab).
-- It adds the sales_team division and cities columns if they are missing, REPLACES all
-- rows in sales_team with the real team, and does not touch dealers or form submissions.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS sales_team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  department VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(255),
  region VARCHAR(255),
  division VARCHAR(50) NOT NULL DEFAULT 'Plywood',
  cities TEXT,
  photo_url VARCHAR(500),
  linkedin VARCHAR(500),
  sort_order INT DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET @missing := (SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sales_team' AND COLUMN_NAME = 'division');
SET @ddl := IF(@missing, 'ALTER TABLE sales_team ADD COLUMN division VARCHAR(50) NOT NULL DEFAULT ''Plywood'' AFTER region', 'SELECT 1');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @missing := (SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sales_team' AND COLUMN_NAME = 'cities');
SET @ddl := IF(@missing, 'ALTER TABLE sales_team ADD COLUMN cities TEXT AFTER division', 'SELECT 1');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

DELETE FROM sales_team;

INSERT INTO sales_team (name, designation, phone, email, region, division, cities, sort_order, active) VALUES
  ('Karunanidhi R.', 'Manager', '+91 94449 54801', 'rk@sharonply.com', 'Chennai Outer', 'Plywood', 'Arakkonam, Tiruvallur, Tiruttani, Ponneri, Gummidipoondi, Madhavaram, Chennai - Choolai, Chennai - Parrys', 1, 1),
  ('David Ebenezer C.', 'Asst. Manager', '+91 90433 00330', 'david@sharonply.com', 'Chennai Outer', 'Plywood', 'Arakkonam, Tiruvallur, Tiruttani, Ponneri, Gummidipoondi, Madhavaram, Chennai - Choolai, Chennai - Parrys', 2, 1),
  ('Rajesh S.', 'Manager', '+91 99625 86664', 's.rajesh@sharonply.com', 'Chennai 1', 'Plywood', 'Chennai - Avadi, Chennai - Thiruninravur, Chennai - Ambattur, Chennai - Villivakkam, Chennai - Triplicane, Chennai - Kolathur', 3, 1),
  ('Manickam T.', 'Manager', '+91 93300 26657', 't.manickam@sharonply.com', 'Chennai 2', 'Plywood', 'Chennai - Sriperumbudur, Chennai - Kundrathur, Chennai - Poonamallee, Chennai - Porur, Chennai - Valasaravakkam, Chennai - Vadapalani, Chennai - Kodambakkam, Chennai - Gemini, Chennai - Mogappair', 4, 1),
  ('Uthaman S.', 'Manager', '+91 78239 64060', 's.uthaman@sharonply.com', 'Chennai 3', 'Plywood', 'Chennai - Alwarpet, Chennai - Adyar, Chennai - Thiruvanmaiyur, Chennai - Velachery, Chennai - Keelkattalai, Chennai - Tambaram, Chennai - Perungalathur, Guduvancherry, Chengalpattu, Mahabalipuram, Tiruporur, Chennai - Kelambakkam, Chennai - Injambakkam, Chennai - Medavakkam, Chennai - Madipakkam, Chennai - Rajkeelpakkam, Chennai - Saidapet, Chennai - Pallavaram', 5, 1),
  ('Periasamy T.', 'Sr. Manager', '+91 78239 93482', 't.periasamy@sharonply.com', 'Coimbatore', 'Plywood', 'Coimbatore, Pollachi, Mettupalayam, Erode, Bhavani, Gobichettipalayam, Sathyamangalam, Tiruppur, Avinashi, Palladam, Dharapuram, Udumalaipettai, Tiruchengode, Udhagamandalam (Ooty), Coonoor, Gudalur, Kotagiri', 6, 1),
  ('Sundarprabhu A.', 'Asst. Manager', '+91 93848 07292', 'sundarprabhu@sharonply.com', 'Coimbatore', 'Plywood', 'Coimbatore, Pollachi, Mettupalayam, Erode, Bhavani, Gobichettipalayam, Sathyamangalam, Tiruppur, Avinashi, Palladam, Dharapuram, Udumalaipettai, Tiruchengode, Udhagamandalam (Ooty), Coonoor, Gudalur, Kotagiri', 7, 1),
  ('Darunkumar A.', 'Asst. Manager', '+91 73053 72896', 'darunkumar@sharonply.com', 'Coimbatore', 'Plywood', 'Coimbatore, Pollachi, Mettupalayam, Erode, Bhavani, Gobichettipalayam, Sathyamangalam, Tiruppur, Avinashi, Palladam, Dharapuram, Udumalaipettai, Tiruchengode, Udhagamandalam (Ooty), Coonoor, Gudalur, Kotagiri', 8, 1),
  ('Jeevanantham M.', 'Sr. Executive', '+91 94449 14800', 'm.jeeva@sharonply.com', 'Coimbatore', 'Plywood', 'Coimbatore, Pollachi, Mettupalayam, Erode, Bhavani, Gobichettipalayam, Sathyamangalam, Tiruppur, Avinashi, Palladam, Dharapuram, Udumalaipettai, Tiruchengode, Udhagamandalam (Ooty), Coonoor, Gudalur, Kotagiri', 9, 1),
  ('Anand J.', 'Asst. General Manager', '+91 94449 14801', 'j.anand@sharonply.com', 'Kumbakonam / Trichy', 'Plywood', 'Kumbakonam, Tiruvarur, Mannargudi, Thiruthuraipoondi, Nagapattinam, Velankanni, Vedaranyam, Mayiladuthurai, Sirkazhi, Karaikkal, Karaikudi, Perambalur, Karur, Aranthangi, Pudukkottai, Pattukkottai, Ariyalur, Jayankondam, Tiruchirappalli, Thanjavur', 10, 1),
  ('Karthi R.', 'Asst. Manager', '+91 78239 83474', 'r.karthi@sharonply.com', 'Kumbakonam', 'Plywood', 'Kumbakonam, Tiruvarur, Mannargudi, Thiruthuraipoondi, Nagapattinam, Velankanni, Vedaranyam, Mayiladuthurai, Sirkazhi, Karaikkal', 11, 1),
  ('Prakash T.', 'Sr. Executive', '+91 62908 25170', 't.prakash@sharonply.com', 'Trichy', 'Plywood', 'Karaikudi, Perambalur, Karur, Aranthangi, Pudukkottai, Pattukkottai, Ariyalur, Jayankondam, Tiruchirappalli, Thanjavur', 12, 1),
  ('Arun Kumar B.', 'Executive', '+91 98844 55250', 'b.arunkumar@sharonply.com', 'Trichy', 'Plywood', 'Karaikudi, Perambalur, Karur, Aranthangi, Pudukkottai, Pattukkottai, Ariyalur, Jayankondam, Tiruchirappalli, Thanjavur', 13, 1),
  ('Prabu V.', 'Asst. General Manager', '+91 94449 14802', 'v.prabu@sharonply.com', 'Madurai', 'Plywood', 'Dindigul, Palani, Kodaikanal, Oddanchatram, Madurai, Usilampatti, Ramanathapuram, Rameswaram, Paramakudi, Keelakarai, Sivaganga, Devakottai, Manamadurai, Theni, Cumbam, BODI, Periyakulam, Virudhunagar', 14, 1),
  ('Sakthivel T.', 'Asst. Manager', '+91 99625 25789', 't.sakthivel@sharonply.com', 'Madurai', 'Plywood', 'Dindigul, Palani, Kodaikanal, Oddanchatram, Madurai, Usilampatti, Ramanathapuram, Rameswaram, Paramakudi, Keelakarai, Sivaganga, Devakottai, Manamadurai, Theni, Cumbam, BODI, Periyakulam, Virudhunagar', 15, 1),
  ('Sebastian Daniel A.', 'Executive', '+91 89252 76622', 'a.sebastian@sharonply.com', 'Madurai', 'Plywood', 'Dindigul, Palani, Kodaikanal, Oddanchatram, Madurai, Usilampatti, Ramanathapuram, Rameswaram, Paramakudi, Keelakarai, Sivaganga, Devakottai, Manamadurai, Theni, Cumbam, BODI, Periyakulam, Virudhunagar', 16, 1),
  ('Jai Godman T.', 'Manager', '+91 94449 09301', 't.jai@sharonply.com', 'Tirunelveli', 'Plywood', 'Nagercoil, Kanyakumari, Marthandam, Tenkasi, Sankarankovil, Shenkottai, Thoothukudi, Kovilpatti, Tiruchendur, Tirunelveli, Ambasamudram, Nanguneri, Sivakasi, Rajapalayam, Srivilliputhur, Aruppukottai', 17, 1),
  ('Ramesh Vikram V.', 'Sr. Executive', '+91 72002 40844', 'rameshvikram@sharonply.com', 'Tirunelveli', 'Plywood', 'Nagercoil, Kanyakumari, Marthandam, Tenkasi, Sankarankovil, Shenkottai, Thoothukudi, Kovilpatti, Tiruchendur, Tirunelveli, Ambasamudram, Nanguneri, Sivakasi, Rajapalayam, Srivilliputhur, Aruppukottai', 18, 1),
  ('Manikandan J.', 'Sr. Manager', '+91 91766 63728', 'j.manikandan@sharonply.com', 'Pondicherry', 'Plywood', 'Viluppuram, Tindivanam, Gingee, Cuddalore, Chidambaram, Panruti, Neyveli, Virudhachalam, Pondicherry, Ulundurpet, Tirukoilur, Madurantakam', 19, 1),
  ('Dhinesh S.', 'Asst. Manager', '+91 89258 33253', 's.dhinesh@sharonply.com', 'Pondicherry', 'Plywood', 'Viluppuram, Tindivanam, Gingee, Cuddalore, Chidambaram, Panruti, Neyveli, Virudhachalam, Pondicherry, Ulundurpet, Tirukoilur, Madurantakam', 20, 1),
  ('Iyandurai M.', 'Manager', '+91 78239 98741', 'm.iyandurai@sharonply.com', 'Salem', 'Plywood', 'Dharmapuri, Pennagaram, Kallakurichi, Krishnagiri, Bargur, Hosur, Namakkal, Rasipuram, Salem, Mettur, Attur', 21, 1),
  ('Manikandan C.', 'Sr. Executive', '+91 94449 14803', 'c.manikandan@sharonply.com', 'Salem', 'Plywood', 'Dharmapuri, Pennagaram, Kallakurichi, Krishnagiri, Bargur, Hosur, Namakkal, Rasipuram, Salem, Mettur, Attur', 22, 1),
  ('Koteeswaran S.', 'Manager', '+91 94449 91392', 's.kotteeswaran@sharonply.com', 'Vellore', 'Plywood', 'Kancheepuram, Ranipet, Arcot, Walajapet, Sholinghur, Tirupathur, Ambur, Vaniyambadi, Tiruvannamalai, Arani, Cheyyar, Vandavasi, Polur, Vellore, Gudiyatham', 23, 1),
  ('Ananthakumar T.', 'Manager – Decorative Veneer', '+91 78239 70671', 't.ananthakumar@sharonply.com', 'Veneer', 'Veneer', 'Tamil Nadu', 24, 1);
