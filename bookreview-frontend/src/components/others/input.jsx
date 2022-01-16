import React from 'react';

export const Input = ({ props }) => {
    let { type, label, placeHolder, labelClass, className, others } = props;
    return (
        <div className="flex flex-col">
            <label className={`fs-15 ln-24 mb-4 ${labelClass}`}>{label}</label>
            <div className="w100 flex-row items-center"></div>
            {type === 'search' &&
                <div className='flex flex-column'>
                    <div className='flex flex-row'>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8789 13.248L9.69236 8.96875C10.527 7.95703 10.9443 6.79036 10.9443 5.46875C10.9443 4.47526 10.7042 3.55924 10.2241 2.7207C9.74396 1.88216 9.08883 1.21908 8.2587 0.731445C7.42857 0.243815 6.52665 0 5.55293 0C4.57922 0 3.67954 0.243815 2.85389 0.731445C2.02825 1.21908 1.37537 1.88216 0.895241 2.7207C0.415113 3.55924 0.175049 4.47526 0.175049 5.46875C0.175049 6.46224 0.415113 7.37826 0.895241 8.2168C1.37537 9.05534 2.02825 9.71842 2.85389 10.2061C3.67954 10.6937 4.58146 10.9375 5.55966 10.9375C6.89684 10.9375 8.07248 10.4909 9.08659 9.59766L13.2597 13.8633C13.3494 13.9544 13.4526 14 13.5693 14C13.6859 14 13.7869 13.9567 13.8722 13.8701C13.9574 13.7835 14 13.6787 14 13.5557C14 13.4326 13.9597 13.3301 13.8789 13.248ZM5.55966 10.0762C4.73402 10.0762 3.97345 9.86882 3.27793 9.4541C2.58242 9.03939 2.03274 8.47884 1.6289 7.77246C1.22505 7.06608 1.02313 6.29818 1.02313 5.46875C1.02313 4.63932 1.22505 3.87142 1.6289 3.16504C2.03274 2.45866 2.58242 1.89811 3.27793 1.4834C3.97345 1.06868 4.73178 0.861328 5.55293 0.861328C6.37409 0.861328 7.13242 1.06868 7.82793 1.4834C8.52345 1.89811 9.07313 2.45866 9.47697 3.16504C9.88082 3.87142 10.0827 4.63932 10.0827 5.46875C10.0827 5.82422 10.0424 6.17513 9.96159 6.52148C9.88082 6.86784 9.76639 7.19141 9.61832 7.49219C9.47024 7.79297 9.293 8.0778 9.08659 8.34668C8.88018 8.61556 8.64684 8.85482 8.38659 9.06445C8.12633 9.27409 7.84813 9.4541 7.55197 9.60449C7.25582 9.75488 6.93723 9.87109 6.5962 9.95312C6.25518 10.0352 5.90966 10.0762 5.55966 10.0762Z" fill="#241400" />
                        </svg>
                        <input placeholder={placeHolder} />
                    </div>
                    <svg className='wp-100' height="1" viewBox="0 0 200 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="200" y2="0.5" stroke="#696764" stroke-opacity="0.59" />
                    </svg>
                </div>}
            {type === 'password' &&
                <input type={'password'} className={`${className} height-30`} {...others} />}
            {type === 'email' &&
                <input type={'email'} className={`${className} height-30`}  {...others} />}
            {type === 'text' && type !== 'password' &&
                <input type={'text'} className={`${className} height-30`} {...others} />}
            {type === 'messenger' && type !== 'password' &&
                <input type={'text'} className={`${className} height-30`} {...others} />}
            {!type &&
                <input className={`input ${className}`} {...others} />}
        </div>
    )
}