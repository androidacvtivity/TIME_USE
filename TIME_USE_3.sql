        SELECT     
                DISTINCT    
                   FC.CUIIO,
                   FC.CUIIO_VERS,
                   R.DENUMIRE,
                   R.CUATM,
                   RR.ID_USER,
                   RR.USER_NAME
                   
              FROM(    
      SELECT FC.CUIIO,
                   FC.CUIIO_VERS,
                   FC.FORM,
                   FC.FORM_VERS,
                   FC.STATUT
              FROM CIS2.FORM_CUIIO  FC
                   INNER JOIN (  SELECT CUIIO, MAX (CUIIO_VERS) CUIIO_VERS
                                   FROM CIS2.FORM_CUIIO
                                  WHERE FORM IN (102) AND CUIIO_VERS <= :pPERIOADA
                               GROUP BY CUIIO) BB
                       ON (    BB.CUIIO = FC.CUIIO
                           AND BB.CUIIO_VERS = FC.CUIIO_VERS)
             WHERE FC.FORM IN (102) AND FC.STATUT <> '3' ) FC 
             
                            INNER JOIN CIS2.RENIM R ON R.CUIIO = FC.CUIIO 
                                    AND R.CUIIO_VERS = FC.CUIIO_VERS 
                                    
                                    INNER JOIN (
                                      SELECT
  DISTINCT L.ID_USER,
  L.USER_NAME,
  
  TRIM(UPPER(NAME||' '||SURNAME)) DENUMIRE
    
  FROM CIS2.SYS_USER L
        INNER JOIN CIS2.SYS_USER_ACCES R ON R.ID_USER = L.ID_USER  
        
        WHERE 
        R. FORM IN (102)
                                    )  RR ON TRIM(RR.DENUMIRE) = TRIM(R.DENUMIRE)
                                    
                                    
                             
                                  
                    WHERE 
                   R.DENUMIRE LIKE '%BANT%'
                 --   R.CUATM IN ('0100000')
                     ORDER BY
                   R.DENUMIRE      

