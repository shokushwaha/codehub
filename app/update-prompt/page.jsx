'use client'
import Form from '@components/Form'
import WriteLoader from '@components/WriteLoader';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  padding-top: 10rem;




  
@media screen and (max-width: 500px) {
display: flex;
flex-direction: column;
flex-direction: column-reverse;
padding-top: 2rem;

  }

`;

const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const { data: session } = useSession();
    const editPrompt = async (e) => {


        e.preventDefault();
        setSubmitting(true);


        if (!promptId)
            return alert('PrompId not found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false);
        }

    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId)
            getPromptDetails();
    }, [promptId])

    return (
        <>
            <StyledDiv>

                <Form

                    type='Edit'
                    post={post}
                    setPost={setPost}
                    submitting={submitting}
                    hanldeSubmit={editPrompt}

                />
                <WriteLoader />
            </StyledDiv>
        </>
    )
}

export default UpdatePrompt