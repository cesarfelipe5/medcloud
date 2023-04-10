import moment from 'moment';
import './LayoutBase.css';
import { ILayoutBase } from './LayoutBase.types';

moment.locale('pt-br');

export const LayoutBase = ({ children, title }: ILayoutBase) => {
    return (
        <div className='container'>
            <div className='header'>
                <div> Imagem</div>

                <div className='dateHour'>
                    {moment().format('DD [de] MMMM [de] YYYY')}</div>
                <div />
            </div>

            <div className='title'>{title}</div>

            {children}
        </div>
    );
};