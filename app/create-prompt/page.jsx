'use client'
import Form from '@components/Form'
import WriteLoader from '@components/WriteLoader';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
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

const CreatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const { data: session } = useSession();
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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

    return (
        <StyledDiv>

            <Form

                type='Create'
                post={post}
                setPost={setPost}
                submitting={submitting}
                hanldeSubmit={createPrompt}

            />
            <WriteLoader />
        </StyledDiv>

    )
}

export default CreatePrompt