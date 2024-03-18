CREATE USER 'chuck'@'localhost' IDENTIFIED BY 'norris45';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'chuck'@'localhost';
FLUSH PRIVILEGES;
