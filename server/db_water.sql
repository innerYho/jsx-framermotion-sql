CREATE DATABASE db_water;

CREATE TABLE tbl_water(
wtr_id int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
wtr_volume_mlt int(5) NOT NULL,
wtr_add_remove tinyint(1) NOT NULL,
wtr_date timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;


INSERT INTO `tbl_water` (`wtr_id`, `wtr_volume_mlt`, `wtr_add_remove`, `wtr_date`) VALUES (NULL, '1000', '1', NOW());
