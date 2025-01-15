import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import DirectionsBoatFilledRoundedIcon from '@mui/icons-material/DirectionsBoatFilledRounded';

class CategoriesClass {
    constructor() {
        this.category = {}
    }
    setCategoryIcon(cat, icon) {
        this.category[cat] = { icon: icon };
    }
    getCategoryIcon(cat) {
        return this.category[cat] ? this.category[cat].icon : "no icon";
    }
}

export const Categories = new CategoriesClass()
Categories.setCategoryIcon('Food', <RestaurantRoundedIcon />)
Categories.setCategoryIcon('Transport', <CommuteRoundedIcon />)
Categories.setCategoryIcon('Shopping', <LocalMallRoundedIcon />)
Categories.setCategoryIcon('Entertainment', <AttractionsRoundedIcon />)
Categories.setCategoryIcon('Accomodation', <KingBedRoundedIcon />)
Categories.setCategoryIcon('Others', <SellRoundedIcon />)
Categories.setCategoryIcon('Insurance', <HealthAndSafetyRoundedIcon />)
Categories.setCategoryIcon('Ferry', <DirectionsBoatFilledRoundedIcon />)