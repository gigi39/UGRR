
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/museums', async (req, res) => {
    try {
        const allMuseums = [];

        // Array containing folder IDs of all 29 museums
        const museumFolderIds = [
            '1hPRkAw9yFC8cm4NhaXMadnKkx2d-7mNV',
            '1CBY1NDZ2aeMDOlaWhEKp7x1D5wljuDm8',
            '1xgE6k0giP2Mnr1jtIi4MtQmyHPBaVyEm',
            '1JkfO_zF26x0GWwU4kzhqOOidpk_IAJJe',
            '1QdVB7P4JrlVpQ8lHY_T8PO3wxp7GGGGy',
            '1WDniAN0iTD6brDg7pN1fyR3jwWo5O0bq',
            '1d8ArKo1EVkMNyxnSaIKnCyiP1oPsXfSp',
            '1FqgD_wdBq45qu50iuTKO-VbEnvtRnp8s',
            '1275nTlj0Eh7rZQY--_zseR9-xCqoz2eR',
            '15GMEPtOHmO8f_ed6gYGJjnoojMj3YiIH',
            '1kStkw5FBKEvGdHDe0hfL3Dgc24rTsS_g',
            '1SysAfS8gpEUbjkFv_UQIE3m4B1oSXEVh',
            '1XZXEbYOrbNIEXjv_FlP9sTp67EJmFE7v',
            '1K-2GhpcXeV3-IzpxueFJqE8VfxgiI8iz',
            '1v45nWfBeOAg0SNOl0cEVYb8O1RN-UI4B',
            '15t5lfvYK0FIWxwM53dfUI2G5hd8HefA0',
            '1FDJ3g0Ehxr3-tTYanLkfMWIzfRueD6Iz',
            '1RRfZA5ga7LgrkVHz7KQnTdd02nKMImMr',
            '1OPIv6mlANmdmYSZb3LS5-B8C_muAc9bn',
            '1QhLCLNUkav5ji5nU83sCsTbWdGi_Abri',
            '11hj0ghbCVozRpS2FNt3OzzLSs0G2L04i',
            '1cKsEwupWTAsspV2DDojiVyhAwpZ5xIGY',
            '1jf4WsquT8WsIr9Ka_4Ge5m9182P8644R',
            '1SxbQEhdErOVqAjjnCSicboqxaWvN6EmB',
            '14lKvrSS5wZYc4_nERU3G0UmK2sPjbq3M',
            '1Q4aCAuoLXr14_WwrBiKAK6Z1_dhef298',
            '1p54hdbYTHshR45zljWSnmBpEYAFf3viv',
            '10rgdL8WTkUyeDZmQlC5C_SPvTwzeraOq',
            '1l9ZzesAJCR7HYt5Mlq9Rvrb8g6dtAw2y',
            // Add the rest of the folder IDs here...
            
        ];

        // Iterate over each museum folder
        for (const folderId of museumFolderIds) {
            const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${folderId}/children`, {
                params: {
                    fields: 'files(name, thumbnailLink, description, webContentLink)',
                    key: 'IzaSyBgO5mVPTvDamPkEvFARPocK1-FE50CIbA'
                }
            });
            

            const museumData = response.data.files.map(file => ({
                name: file.name,
                image: file.thumbnailLink,
                video: file.webContentLink,
                description: file.description
            }));

            allMuseums.push(...museumData);
        }

        res.json(allMuseums);
    } catch (error) {
        console.error('Error fetching museums:', error);
        res.status(500).json({ error: 'Failed to fetch museums' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



