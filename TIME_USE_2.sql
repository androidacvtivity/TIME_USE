SELECT
  ID_USER,
  USER_NAME,
  PASSWORD,
  STATUS,
  ISADMIN,
  NAME,
  SURNAME,
  PHONE,
  DATA_REG,
  ADDRES,
  PASS_CHANGE,
  E_MAIL,
  SESSION_IP,
  SESSION_DATE,
  START_DATE,
  END_DATE,
  PASS_CHANGE_DATE,
  PASS_TRY,
  SYS_USER  
    
  FROM CIS2.SYS_USER
  
  WHERE 
  USER_NAME LIKE 'topa%'
  ORDER BY
  USER_NAME;
  
  
  
  SELECT
  ID_USER,
  USER_NAME,
  
  UPPER(NAME||' '||SURNAME) DENUMIRE
    
  FROM CIS2.SYS_USER
  
  WHERE 
  USER_NAME LIKE 'sir%'
  ORDER BY
  USER_NAME