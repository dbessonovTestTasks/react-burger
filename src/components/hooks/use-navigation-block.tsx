import { useRef, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useNavigationBlock() {
    const partRef = useRef<HTMLDivElement>();
    const { ref: partRefIV, inView: isBlockVisible } = useInView();
    const blockRef = useCallback(
        (node: HTMLDivElement) => {
            partRef.current = node;
            partRefIV(node);
        },
        [partRefIV],
    );
    const scrollToBlock = () => partRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });

    return [blockRef, scrollToBlock, isBlockVisible] as const;
}