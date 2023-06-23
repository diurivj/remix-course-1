import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Link, useSearchParams } from '@remix-run/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function OrderDropdown({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [searchParams] = useSearchParams();

  const orderBy = searchParams.get('orderBy') || options[0].value;
  const [selected, setSelected] = useState(orderBy);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
            Ordenar por
          </Listbox.Label>
          <div className='relative mt-2'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
              <span className='block truncate'>
                {options.find((opt) => opt.value === selected)?.label}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    as={Link}
                    to={`?orderBy=${option.value}`}
                    key={option.value}
                    className={
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span className={classNames('block truncate')}>
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            }
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
