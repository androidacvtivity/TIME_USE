SELECT
  DISTINCT L.ID_USER,
  L.USER_NAME,
  
  TRIM(UPPER(NAME||' '||SURNAME)) DENUMIRE
    
  FROM CIS2.SYS_USER L
        INNER JOIN CIS2.SYS_USER_ACCES R ON R.ID_USER = L.ID_USER  
        
        WHERE 
        R. FORM IN (102)
        
        -------------------------------------------------------------------------