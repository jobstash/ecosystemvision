import { Fragment } from 'react';

import { FundingRound } from '@/shared/core/schemas';
import { InfoTagProps } from '@/shared/core/types';
import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { InfoTags } from '@/shared/components/info-tags';

const HEADING_TEXT = 'Funding Rounds';

const createFundingRoundTags = (fundingRound: FundingRound) => {
	const { roundName, date, raisedAmount } = fundingRound;

	const tags: InfoTagProps[] = [];

	if (roundName) {
		tags.push({
			text: `Funding Round: ${roundName}`,
			icon: <PaperbillIcon />,
		});
	}

	tags.push({
		text: `Funding Date: ${shortTimestamp(date)}`,
		icon: <BankIcon />,
	});

	if (raisedAmount) {
		tags.push({
			text: `Raised Amount: $${formatNumber(raisedAmount)}M`,
			icon: <PaperbillIcon />,
		});
	}

	return tags;
};

const DashedLine = () => (
	<div className="h-1 pt-0.5">
		<hr className="border-t border-dashed border-white/20" />
	</div>
);

interface Props {
	fundingRounds: FundingRound[];
}

export const FundingRounds = ({ fundingRounds }: Props) => {
	const count = fundingRounds.length;

	if (!count) return null;

	return (
		<>
			<Divider />

			<Heading text={HEADING_TEXT} className="text-lg font-semibold" />

			<div className="flex flex-col justify-center gap-2">
				{fundingRounds.map((fundingRound, i) => (
					<Fragment key={fundingRound.id}>
						<div className="flex flex-wrap">
							<InfoTags
								tags={createFundingRoundTags(fundingRound)}
								classNames={{ wrapper: 'gap-y-0' }}
							/>
						</div>
						{i !== count - 1 && <DashedLine />}
					</Fragment>
				))}
			</div>
		</>
	);
};
