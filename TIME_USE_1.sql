        SELECT     
                   FC.CUIIO,
                   FC.CUIIO_VERS,
                   R.DENUMIRE,
                   R.CUATM
                   
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
                                    
                                    
                                    WHERE 
                                    
                                 R.DENUMIRE LIKE 'SIR%'
                                 AND 
                                 R.CUATM IN ('0000000')
                                    
                                    ORDER BY
                                    R.DENUMIRE 