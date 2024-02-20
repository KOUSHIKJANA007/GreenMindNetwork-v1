import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleAction } from '../store/articleSlice';
import { fetchAction } from '../store/fetchSlice';

const FetchArticles = () => {
    const fetchStatus = useSelector((store) => store.fetchStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        if (fetchStatus.fetchDone) return;
        const controller = new AbortController;
        const signal = controller.signal;
        dispatch(fetchAction.FetchStarted());
        fetch("https://dummyjson.com/posts", { signal })
            .then((res) => res.json())
            .then((data) => {
                dispatch(fetchAction.FetchDone());
                dispatch(fetchAction.FetchEnded());
                dispatch(articleAction.addInitialArticle(data.posts));
            });
        return () => {
            controller.abort();
        }
    }, [fetchStatus])
    return (
        <></>
    )
}

export default FetchArticles