import { useState, useEffect, useRef, memo } from 'react';
import { useBuilder } from 'build-ui';
import { unstable_batchedUpdates as batch } from 'react-dom';
import { Button } from '@nextui-org/react';
import { createPage, fetchPages } from '../utils/request';
import Link from 'next/link';

const MenuBar = ({ className, data, ...props }) => {
  const builder = useBuilder();
  const hiddenFileInput = useRef(null);
  const saver = useRef();
  const exporterHTML = useRef();

  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [saveLink, setSaveLink] = useState(null);

  const [file, setFile] = useState(null);

  const { handleRedo, handleUndo, json, loadTree, canRedo, canUndo } = builder;

  const content = JSON.stringify(json());

  const handleSave = () => {
    createPage({ data: content });
  };

  useEffect(() => {
    if (data.length > 0) {
      loadTree(JSON.parse(data[0].data));
    }
  }, []);

  const handleLoad = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleExport = () => {
    const file = new Blob([content], { type: 'application/json' });
    const link = URL.createObjectURL(file);
    setSaveLink(link);
    setSaving(true);
  };

  useEffect(() => {
    if (!saving) return;
    saver.current.click();
    URL.revokeObjectURL(saveLink);
    setSaving(false);
  }, [saving, saveLink]);

  useEffect(() => {
    if (!file) return;
    const content = file.text();
    content
      .then((text) => JSON.parse(text))
      .then((tree) =>
        batch(() => {
          console.log(tree);
          loadTree(tree);
          setFile(null);
        })
      )
      .catch();
  });

  return (
    <Button.Group {...props}>
      <Button onClick={handleRedo} disabled={!canRedo}>
        Redo
      </Button>

      <Button onClick={handleUndo} disabled={!canUndo}>
        Undo
      </Button>
      <Button color="primary" variant="outlined" onClick={handleSave}>
        Save
      </Button>
      <a hidden={true} download={true} href={saveLink} ref={saver} />
      <Button onClick={handleClick}>
        Load
        <input
          hidden={true}
          type="file"
          name="load_tree"
          ref={hiddenFileInput}
          onChange={handleLoad}
        />
      </Button>
      <Button onClick={handleExport}>Export</Button>
      <Button>
        <Link href={'/customer'}>
          <a target="_blank">
            <Button>View</Button>
          </a>
        </Link>
      </Button>
    </Button.Group>
  );
};

export default memo(MenuBar);
