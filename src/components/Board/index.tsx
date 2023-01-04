import MetaTags from '@components/Common/MetaTags'
import { NoDataFound } from '@components/UI/NoDataFound'
import { FetchBoardPins } from '@lib/db/actions'
import { BoardType } from '@utils/custom-types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import BoardInfo from './Info'
import BoardPins from './Pins'
import formatHandle from '@utils/functions/formatHandle'
import useAppStore from '@lib/store'
import { Profile, useProfileQuery } from '@utils/lens/generated'
import Custom404 from '@pages/404'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer'

interface Props {
    board: BoardType
}

const Board: NextPage<Props> = ({ board }) => {

    const { query } = useRouter()
    const username = query.username ?? ''
    const handle = formatHandle(username as string, true);
    const currentProfile = useAppStore((state) => state.currentProfile)

    const { data, loading, error } = useProfileQuery({
        variables: {
        request: { handle },
            who: currentProfile?.id ?? null
        },
        skip: !handle
    })
    // @ts-ignore
    const { isLoading, isFetched, isError, data : pins } = FetchBoardPins(board.id)

    const postIds = isFetched && pins?.map((pin: { postId: string }) => pin.postId)

    //if (!data?.profile) return <Custom404 />
    
    const userProfile = data?.profile as Profile

    return (
        <>
            <MetaTags title={`${board?.name} :: Pinsta`} />
            <div className='flex flex-col'>
                {isFetched && userProfile ?
                    <>
                        <BoardInfo pins={pins} profile={userProfile} board={board} />
                        <BoardPins pins={pins} profile={userProfile} postIds={postIds} />
                    </>
                    : <TimelineShimmer/>
                }
            </div>
        </>
    )
}

export default Board