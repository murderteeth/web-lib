import React from 'react';
import {toast} from 'react-hot-toast';
import IconAlertCritical from '@yearn-finance/web-lib/icons/IconAlertCritical';
import IconAlertError from '@yearn-finance/web-lib/icons/IconAlertError';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCheckmark from '@yearn-finance/web-lib/icons/IconCheckmark';

import type {ReactElement} from 'react';

type TCTA = {
	label: string;
	onClick: () => void
};

type TUseToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
	cta?: TCTA;
}

function buildMessage({content, cta}: Pick<TUseToast, 'content' | 'cta'>): ReactElement {
	return (
		<div className={'flex items-center gap-2'}>
			{content}
			<button className={'text-primary-500 bg-primary-100 ml-10 py-1 px-2 text-xs'} onClick={cta?.onClick}>{cta?.label}</button>
		</div>
	);
}

export function useToast({content, type, cta}: TUseToast): () => string {
	const message = cta ? buildMessage({content, cta}) : content;

	switch (type) {
	case 'error':
		return (): string => toast(message, {
			icon: <IconAlertCritical className={'ml-3'} />,
			style: {
				backgroundColor: '#C73203',
				color: 'white'
			}
		});
	case 'warning':
		return (): string => toast(message, {
			icon: <IconAlertWarning className={'ml-3'} />,
			style: {
				backgroundColor: '#FFDC53'
			}
		});
	case 'success':
		return (): string => toast(message, {
			icon: <IconCheckmark className={'ml-3'} />,
			style: {
				backgroundColor: '#00796D',
				color: 'white'
			}
		});
	case 'info':
		return (): string => toast(message, {
			icon: <IconAlertError className={'ml-3'} />,
			style: {
				backgroundColor: '#0657F9',
				color: 'white'
			}
		});
	default:
		return (): string => toast.success(content);
	}
}