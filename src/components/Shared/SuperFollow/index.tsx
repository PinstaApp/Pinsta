import { Button } from '@components/Shared/Button';
import Modal from '@components/Shared/Modal';
import formatHandle from '@utils/functions/formatHandle';
import type { Profile } from '@utils/lens';
import dynamic from 'next/dynamic';
import type { Dispatch, FC } from 'react';
import { useState } from 'react';
import { BiStar } from 'react-icons/bi';

import Slug from '../Slug';
import { Loader } from '../Loader';

const FollowModule = dynamic(() => import('./FollowModule'), {
  loading: () => <Loader />
});

interface Props {
    profile: Profile;
    setFollowing: Dispatch<boolean>;
    showText?: boolean;
    again?: boolean;
}

const SuperFollow: FC<Props> = ({ profile, setFollowing, showText = false, again = false }) => {
    const [showFollowModal, setShowFollowModal] = useState(false);

    return (
        <>
            <Button
                className="text-sm !px-3 !py-1.5"
                outline
                onClick={() => {
                    setShowFollowModal(!showFollowModal);
                }}
                aria-label="Super Follow"
                icon={<BiStar className="w-4 h-4" />}
            >
                {showText && `Super follow`}
            </Button>
            <Modal
                title={
                    <span>
                        Super follow <Slug slug={formatHandle(profile?.handle)} prefix="@" /> {again ? 'again' : ''}
                    </span>
                }
                icon={<BiStar className="w-5 h-5 text-pink-500" />}
                show={showFollowModal}
                onClose={() => setShowFollowModal(false)}
            >
                <FollowModule
                    profile={profile}
                    setFollowing={setFollowing}
                    setShowFollowModal={setShowFollowModal}
                    again={again}
                />
            </Modal>
        </>
    );
};

export default SuperFollow;