import React from 'react'
import { styleIcon } from '../../constants/appConstant';
import {RiArticleLine} from 'react-icons/ri'
import {FaCompactDisc} from 'react-icons/fa'
import {GiMicrophone} from 'react-icons/gi'
import  parse  from 'html-react-parser';
import { BsCalendar2Week } from 'react-icons/bs';
import InfoIconLabel from './InfoIconLabel';

const InfoCollapse = ({dataAlbum}) => {

    //on déclare les constantes
    const date = new Date(dataAlbum?.releaseDate);
    const option = {day: 'numeric', month: 'long', year: 'numeric'};
    const dateFormat = date.toLocaleDateString('fr-FR', option)


  return (
    <>
    <h2 className='text-xl my-5'>Informations</h2>
    <div className='w-full flex justify-start items-start bg-gradient-to-b from-transparent via-green_top to-transparent pt-5 pb-10'>
        {/*container de gauche */}
        <div className='flex items-start justify-start w-[60%]'>
            <div className='flex-col' style={{maxWidth: '80%'}}>
                <div className='p-1 m-1 flex'>
                    <RiArticleLine className='me-1' style={styleIcon} />
                </div>
                <div className='p-1 m-1 pb-5'>
                    {dataAlbum?.artist?.biography ?
                    parse(dataAlbum?.artist?.biography) : 
                    'aucune bio dispo'
                    }
                </div>
            </div>
        </div>
        {/*container de droite */}
        <div className='flex-col' style={{minWidth: '20%'}}>
            <InfoIconLabel
            icon={{iconName: FaCompactDisc}}
            label='Album'
            value={dataAlbum?.title}
            />
            {/*artiste */}
            <InfoIconLabel
            icon={{iconName: GiMicrophone}}
            label='Artiste'
            value={dataAlbum?.artist?.name}
            />
            {/*date de sortie */}
            <InfoIconLabel
            icon={{iconName: BsCalendar2Week}}
            label='Sortie le'
            value={dateFormat}
            />
        </div>
    
    </div>
    </>
  )
}

export default InfoCollapse